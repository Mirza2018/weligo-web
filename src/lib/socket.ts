import { io, Socket } from "socket.io-client";
import { getSocketUrl } from "@/redux/getBaseUrl";

let socket: Socket | null = null;

/**
 * Creates (or returns the existing) socket connection, authenticated
 * with the current access token. Safe to call multiple times — it
 * will not open a second connection while one is already active.
 */
export const initSocket = (token: string): Socket => {
  if (socket) return socket;

  socket = io(getSocketUrl(), {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
