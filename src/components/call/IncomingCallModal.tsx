import { Phone, PhoneOff, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/redux/getBaseUrl";
import { useCall } from "../providers/CallProvider";

export const IncomingCallModal = () => {
  const {
    incomingCall,
    callStatus,
    remoteUser,
    callType,
    acceptCall,
    rejectCall,
  } = useCall();

  if (!incomingCall || callStatus !== "ringing") return null;

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={getImageUrl(remoteUser?.profileImage) ?? undefined}
          />
          <AvatarFallback>{remoteUser?.name?.[0] ?? "?"}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {remoteUser?.name ?? "Unknown"}
          </p>
          <p className="text-xs text-muted-foreground">
            Incoming {callType === "video" ? "video" : "audio"} call…
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            size="icon"
            variant="destructive"
            className="rounded-full"
            onClick={rejectCall}
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-emerald-500 hover:bg-emerald-600"
            onClick={acceptCall}
          >
            {callType === "video" ? (
              <Video className="h-4 w-4" />
            ) : (
              <Phone className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
