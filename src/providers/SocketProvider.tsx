import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { initSocket, disconnectSocket } from "@/lib/socket";
import {
  setConnected,
  setOnlineUsers,
  setIncomingCall,
} from "@/redux/features/socket/socketSlice";
import type { IncomingCall } from "@/redux/features/socket/socketSlice";

interface SocketContextValue {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>({ socket: null });

export const useSocketContext = () => useContext(SocketContext);

/**
 * Wrap the app (inside the Redux Provider) with this once. It opens
 * the socket connection whenever there's an access token, tears it
 * down on logout/unmount, and keeps `onlineUser` / `call:incoming`
 * synced into Redux so any component can read them.
 */
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      setSocket(null);
      dispatch(setConnected(false));
      return;
    }

    const s = initSocket(accessToken);
    setSocket(s);

    const handleConnect = () => dispatch(setConnected(true));
    const handleDisconnect = () => dispatch(setConnected(false));

    const handleOnlineUsers = (payload: [string, { socketID: string }][]) => {
      dispatch(setOnlineUsers(payload));
    };

    const handleIncomingCall = (payload: IncomingCall) => {
      dispatch(setIncomingCall(payload));
    };

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);
    s.on("onlineUser", handleOnlineUsers);
    s.on("call:incoming", handleIncomingCall);

    return () => {
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
      s.off("onlineUser", handleOnlineUsers);
      s.off("call:incoming", handleIncomingCall);
    };
  }, [accessToken, dispatch]);

  // Disconnect on final unmount (app closing / provider removed).
  useEffect(() => {
    return () => disconnectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
