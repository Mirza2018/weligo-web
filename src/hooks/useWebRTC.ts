import { useRef, useCallback, useState } from "react";

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

/**
 * Wraps a single RTCPeerConnection for the lifetime of one call.
 * Call cleanup() when the call ends before starting another.
 */
export const useWebRTC = () => {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const getMedia = useCallback(async (type: "audio" | "video") => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: type === "video",
    });
    localStreamRef.current = stream;
    setLocalStream(stream);
    return stream;
  }, []);

  const createPeerConnection = useCallback(
    (onIceCandidate: (candidate: RTCIceCandidateInit) => void) => {
      const pc = new RTCPeerConnection(RTC_CONFIG);

      pc.onicecandidate = (event) => {
        if (event.candidate) onIceCandidate(event.candidate.toJSON());
      };

      pc.ontrack = (event) => {
        setRemoteStream((prev) => {
          const stream = prev ?? new MediaStream();
          event.streams[0]?.getTracks().forEach((track) => {
            if (!stream.getTracks().includes(track)) stream.addTrack(track);
          });
          return stream;
        });
      };

      pcRef.current = pc;
      return pc;
    },
    [],
  );

  const attachLocalTracks = useCallback((stream: MediaStream) => {
    stream.getTracks().forEach((track) => {
      pcRef.current?.addTrack(track, stream);
    });
  }, []);

  const flushPendingCandidates = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc?.remoteDescription) return;
    while (pendingCandidates.current.length) {
      const candidate = pendingCandidates.current.shift();
      if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }, []);

  const createOffer = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc) return null;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    return offer;
  }, []);

  const createAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      const pc = pcRef.current;
      if (!pc) return null;
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      await flushPendingCandidates();
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      return answer;
    },
    [flushPendingCandidates],
  );

  const applyRemoteAnswer = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
      await flushPendingCandidates();
    },
    [flushPendingCandidates],
  );

  const addRemoteIceCandidate = useCallback(
    async (candidate: RTCIceCandidateInit) => {
      const pc = pcRef.current;
      if (pc?.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        pendingCandidates.current.push(candidate);
      }
    },
    [],
  );

  const toggleTrack = useCallback(
    (kind: "audio" | "video", enabled: boolean) => {
      localStreamRef.current
        ?.getTracks()
        .filter((t) => t.kind === kind)
        .forEach((t) => (t.enabled = enabled));
    },
    [],
  );

  const cleanup = useCallback(() => {
    pcRef.current?.getSenders().forEach((sender) => sender.track?.stop());
    pcRef.current?.close();
    pcRef.current = null;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    pendingCandidates.current = [];
    setLocalStream(null);
    setRemoteStream(null);
  }, []);

  return {
    localStream,
    remoteStream,
    getMedia,
    createPeerConnection,
    attachLocalTracks,
    createOffer,
    createAnswer,
    applyRemoteAnswer,
    addRemoteIceCandidate,
    toggleTrack,
    cleanup,
  };
};
