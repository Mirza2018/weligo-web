import { useSocketContext } from "@/providers/SocketProvider";

/** Returns the live socket instance, or null if not yet connected. */
export const useSocket = () => useSocketContext().socket;
