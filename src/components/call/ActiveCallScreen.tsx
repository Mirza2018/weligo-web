import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/redux/getBaseUrl";
import { useCall } from "../providers/CallProvider";
// import { useCall } from "@/providers/CallProvider";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export const ActiveCallScreen = () => {
  const {
    callStatus,
    callType,
    remoteUser,
    localStream,
    remoteStream,
    isMuted,
    isCameraOff,
    toggleMute,
    toggleCamera,
    endCall,
  } = useCall();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    if (callStatus !== "connected") {
      setDuration(0);
      return;
    }
    const interval = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  if (callStatus !== "calling" && callStatus !== "connected") return null;
  if (!remoteUser) return null;

  const isVideoCall = callType === "video";
  const statusLabel =
    callStatus === "calling" ? "Calling…" : formatDuration(duration);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-foreground text-background">
      <div className="relative flex-1 overflow-hidden">
        {isVideoCall && remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={getImageUrl(remoteUser.profileImage) ?? undefined}
              />
              <AvatarFallback className="text-2xl">
                {remoteUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-medium">{remoteUser.name}</p>
              <p className="text-sm opacity-70">{statusLabel}</p>
            </div>
          </div>
        )}

        {isVideoCall && (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-4 h-32 w-24 rounded-xl border border-background/30 object-cover shadow-lg"
          />
        )}

        {isVideoCall && remoteStream && (
          <div className="absolute left-4 top-4 rounded-lg bg-foreground/40 px-3 py-1 text-sm backdrop-blur">
            {remoteUser.name} · {statusLabel}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 bg-foreground/95 p-6">
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        {isVideoCall && (
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full"
            onClick={toggleCamera}
          >
            {isCameraOff ? (
              <VideoOff className="h-5 w-5" />
            ) : (
              <Video className="h-5 w-5" />
            )}
          </Button>
        )}

        <Button
          size="icon"
          variant="destructive"
          className="h-14 w-14 rounded-full"
          onClick={endCall}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
