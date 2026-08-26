import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OnlineUserEntry {
  userId: string;
  socketID: string;
}

export interface IncomingCall {
  callId: string;
  type: "audio" | "video";
  caller: {
    _id: string;
    name: string;
    email?: string;
  };
}

export type CallStatus = "idle" | "calling" | "ringing" | "connected" | "ended";

interface SocketState {
  connected: boolean;
  onlineUsers: OnlineUserEntry[];
  incomingCall: IncomingCall | null;
  activeCallId: string | null;
  callStatus: CallStatus;
}

const initialState: SocketState = {
  connected: false,
  onlineUsers: [],
  incomingCall: null,
  activeCallId: null,
  callStatus: "idle",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    // payload shape matches the raw "onlineUser" event:
    // [["userId", { "socketID": "..." }], ...]
    setOnlineUsers: (
      state,
      action: PayloadAction<[string, { socketID: string }][]>,
    ) => {
      state.onlineUsers = action.payload.map(([userId, info]) => ({
        userId,
        socketID: info.socketID,
      }));
    },
    setIncomingCall: (state, action: PayloadAction<IncomingCall | null>) => {
      state.incomingCall = action.payload;
      state.callStatus = action.payload ? "ringing" : state.callStatus;
    },
    setActiveCallId: (state, action: PayloadAction<string | null>) => {
      state.activeCallId = action.payload;
    },
    setCallStatus: (state, action: PayloadAction<CallStatus>) => {
      state.callStatus = action.payload;
    },
    resetCallState: (state) => {
      state.incomingCall = null;
      state.activeCallId = null;
      state.callStatus = "idle";
    },
  },
});

export const {
  setConnected,
  setOnlineUsers,
  setIncomingCall,
  setActiveCallId,
  setCallStatus,
  resetCallState,
} = socketSlice.actions;

export const selectSocketConnected = (state: { socket: SocketState }) =>
  state.socket.connected;

export const selectOnlineUsers = (state: { socket: SocketState }) =>
  state.socket.onlineUsers;

export const selectIsUserOnline =
  (userId?: string) => (state: { socket: SocketState }) =>
    !!userId && state.socket.onlineUsers.some((u) => u.userId === userId);

export const selectIncomingCall = (state: { socket: SocketState }) =>
  state.socket.incomingCall;

export const selectCallStatus = (state: { socket: SocketState }) =>
  state.socket.callStatus;

export const selectActiveCallId = (state: { socket: SocketState }) =>
  state.socket.activeCallId;

export default socketSlice.reducer;
