import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "./useSocket";
import {
  selectIncomingCall,
  selectCallStatus,
  selectActiveCallId,
  setActiveCallId,
  setCallStatus,
  setIncomingCall,
  resetCallState,
} from "@/redux/features/socket/socketSlice";

export interface SdpPayload {
  callId: string;
  sdp: { type: string; sdp: string };
}

export interface IceCandidatePayload {
  callId: string;
  candidate: unknown;
}

interface UseCallSocketOptions {
  onOffer?: (payload: SdpPayload) => void;
  onAnswer?: (payload: SdpPayload) => void;
  onIceCandidate?: (payload: IceCandidatePayload) => void;
  onAccepted?: (payload: { callId: string }) => void;
  onRejected?: (payload: { callId: string }) => void;
  onEnded?: (payload: { callId: string }) => void;
}

/**
 * Handles the call *signaling* (who's calling, offer/answer/ICE
 * exchange, accept/reject/end) via the socket. This does not touch
 * RTCPeerConnection itself — pass your WebRTC callbacks in via the
 * on* options and this hook will invoke them when signals arrive.
 */
export const useCallSocket = (options: UseCallSocketOptions = {}) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const incomingCall = useSelector(selectIncomingCall);
  const callStatus = useSelector(selectCallStatus);
  const activeCallId = useSelector(selectActiveCallId);

  useEffect(() => {
    if (!socket) return;

    const handleOffer = (payload: SdpPayload) => options.onOffer?.(payload);
    const handleAnswer = (payload: SdpPayload) => options.onAnswer?.(payload);
    const handleIceCandidate = (payload: IceCandidatePayload) =>
      options.onIceCandidate?.(payload);

    const handleAccepted = (payload: { callId: string }) => {
      dispatch(setCallStatus("connected"));
      options.onAccepted?.(payload);
    };

    const handleRejected = (payload: { callId: string }) => {
      dispatch(resetCallState());
      options.onRejected?.(payload);
    };

    const handleEnded = (payload: { callId: string }) => {
      dispatch(resetCallState());
      options.onEnded?.(payload);
    };

    socket.on("call:offer", handleOffer);
    socket.on("call:answer", handleAnswer);
    socket.on("call:ice-candidate", handleIceCandidate);
    socket.on("call:accepted", handleAccepted);
    socket.on("call:rejected", handleRejected);
    socket.on("call:end", handleEnded);

    return () => {
      socket.off("call:offer", handleOffer);
      socket.off("call:answer", handleAnswer);
      socket.off("call:ice-candidate", handleIceCandidate);
      socket.off("call:accepted", handleAccepted);
      socket.off("call:rejected", handleRejected);
      socket.off("call:end", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

  // NOTE: assumes the server acknowledges "call:initiate" with the new
  // call's id, i.e. socket.emit(event, data, (res) => ...). Your notes
  // don't document how the caller learns the callId — if your backend
  // sends it a different way (e.g. a dedicated "call:created" event),
  // swap the ack callback below for a socket.on listener instead.
  const initiateCall = useCallback(
    (
      receiverId: string,
      type: "audio" | "video",
      onCreated?: (callId: string) => void,
    ) => {
      if (!socket) return;
      dispatch(setCallStatus("calling"));
      socket.emit(
        "call:initiate",
        { receiverId, type },
        (response: { callId?: string }) => {
          if (response?.callId) {
            dispatch(setActiveCallId(response.callId));
            onCreated?.(response.callId);
          }
        },
      );
    },
    [socket, dispatch],
  );

  const sendOffer = useCallback(
    (callId: string, sdp: { type: string; sdp: string }) => {
      socket?.emit("call:offer", { callId, sdp });
    },
    [socket],
  );

  const sendAnswer = useCallback(
    (callId: string, sdp: { type: string; sdp: string }) => {
      socket?.emit("call:answer", { callId, sdp });
      dispatch(setActiveCallId(callId));
      dispatch(setCallStatus("connected"));
      dispatch(setIncomingCall(null));
    },
    [socket, dispatch],
  );

  const sendIceCandidate = useCallback(
    (callId: string, candidate: unknown) => {
      socket?.emit("call:ice-candidate", { callId, candidate });
    },
    [socket],
  );

  // NOTE: no explicit "reject" emit was documented in your socket
  // notes — this assumes a "call:reject" event. Confirm the real
  // event name with the backend and adjust if different.
  const rejectCall = useCallback(
    (callId: string) => {
      socket?.emit("call:reject", { callId });
      dispatch(resetCallState());
    },
    [socket, dispatch],
  );

  const endCall = useCallback(
    (callId: string) => {
      socket?.emit("call:end", { callId });
      dispatch(resetCallState());
    },
    [socket, dispatch],
  );

  return {
    incomingCall,
    callStatus,
    activeCallId,
    initiateCall,
    sendOffer,
    sendAnswer,
    sendIceCandidate,
    rejectCall,
    endCall,
  };
};
