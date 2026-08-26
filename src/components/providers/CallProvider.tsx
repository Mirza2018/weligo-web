import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCallSocket, type SdpPayload } from "@/hooks/useCallSocket";
import { useWebRTC } from "@/hooks/useWebRTC";
import type { CallStatus } from "@/redux/features/socket/socketSlice";

export interface CallTarget {
  _id: string;
  name: string;
  profileImage?: string;
}

interface CallContextValue {
  incomingCall: ReturnType<typeof useCallSocket>["incomingCall"];
  callStatus: CallStatus;
  callType: "audio" | "video" | null;
  remoteUser: CallTarget | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
  startCall: (target: CallTarget, type: "audio" | "video") => Promise<void>;
  acceptCall: () => Promise<void>;
  rejectCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
}

const CallContext = createContext<CallContextValue | null>(null);

export const useCall = () => {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error("useCall must be used within a CallProvider");
  return ctx;
};

/**
 * Mount once near the app root (inside SocketProvider). Combines
 * call signaling (useCallSocket) with the WebRTC peer connection
 * (useWebRTC) so any component can start/accept/end a call.
 */
export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);
  const [remoteUser, setRemoteUser] = useState<CallTarget | null>(null);
  const [pendingOffer, setPendingOffer] =
    useState<RTCSessionDescriptionInit | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const callIdRef = useRef<string | null>(null);
  const acceptedRef = useRef(false);
  const webrtc = useWebRTC();

  const teardown = () => {
    webrtc.cleanup();
    callIdRef.current = null;
    acceptedRef.current = false;
    setPendingOffer(null);
    setCallType(null);
    setRemoteUser(null);
    setIsMuted(false);
    setIsCameraOff(false);
  };

  const {
    incomingCall,
    callStatus,
    activeCallId,
    initiateCall,
    sendOffer,
    sendAnswer,
    sendIceCandidate,
    rejectCall: signalReject,
    endCall: signalEnd,
  } = useCallSocket({
    onOffer: (payload: SdpPayload) => {
      callIdRef.current = payload.callId;
      setPendingOffer(payload.sdp as RTCSessionDescriptionInit);
    },
    onAnswer: (payload: SdpPayload) => {
      webrtc.applyRemoteAnswer(payload.sdp as RTCSessionDescriptionInit);
    },
    onIceCandidate: (payload) => {
      webrtc.addRemoteIceCandidate(payload.candidate as RTCIceCandidateInit);
    },
    onRejected: teardown,
    onEnded: teardown,
  });

  // A call is ringing for us — capture who's calling and what kind.
  useEffect(() => {
    if (incomingCall) {
      callIdRef.current = incomingCall.callId;
      setCallType(incomingCall.type);
      setRemoteUser({
        _id: incomingCall.caller._id,
        name: incomingCall.caller.name,
      });
    }
  }, [incomingCall]);

  const finalizeAnswer = async (offer: RTCSessionDescriptionInit) => {
    const callId = callIdRef.current;
    if (!callId) return;
    const answer = await webrtc.createAnswer(offer);
    if (answer) sendAnswer(callId, answer);
    setPendingOffer(null);
  };

  // Covers the rare case the offer arrives just after Accept is tapped.
  useEffect(() => {
    if (acceptedRef.current && pendingOffer) {
      finalizeAnswer(pendingOffer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingOffer]);

  const startCall = async (target: CallTarget, type: "audio" | "video") => {
    setRemoteUser(target);
    setCallType(type);

    const stream = await webrtc.getMedia(type);
    webrtc.createPeerConnection((candidate) => {
      if (callIdRef.current) sendIceCandidate(callIdRef.current, candidate);
    });
    webrtc.attachLocalTracks(stream);

    initiateCall(target._id, type, async (callId) => {
      callIdRef.current = callId;
      const offer = await webrtc.createOffer();
      if (offer) sendOffer(callId, offer);
    });
  };

  const acceptCall = async () => {
    if (!callIdRef.current) return;
    acceptedRef.current = true;

    const stream = await webrtc.getMedia(callType ?? "audio");
    webrtc.createPeerConnection((candidate) => {
      if (callIdRef.current) sendIceCandidate(callIdRef.current, candidate);
    });
    webrtc.attachLocalTracks(stream);

    if (pendingOffer) {
      await finalizeAnswer(pendingOffer);
    }
  };

  const rejectCall = () => {
    if (callIdRef.current) signalReject(callIdRef.current);
    teardown();
  };

  const endCall = () => {
    const callId = activeCallId ?? callIdRef.current;
    if (callId) signalEnd(callId);
    teardown();
  };

  const toggleMute = () => {
    const next = !isMuted;
    webrtc.toggleTrack("audio", !next);
    setIsMuted(next);
  };

  const toggleCamera = () => {
    const next = !isCameraOff;
    webrtc.toggleTrack("video", !next);
    setIsCameraOff(next);
  };

  return (
    <CallContext.Provider
      value={{
        incomingCall,
        callStatus,
        callType,
        remoteUser,
        localStream: webrtc.localStream,
        remoteStream: webrtc.remoteStream,
        isMuted,
        isCameraOff,
        startCall,
        acceptCall,
        rejectCall,
        endCall,
        toggleMute,
        toggleCamera,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};
