import { IncomingCallModal } from "./IncomingCallModal";
import { ActiveCallScreen } from "./ActiveCallScreen";

/**
 * Mount once near the app root, inside <CallProvider>. Renders the
 * incoming-call banner and the full-screen active-call UI globally,
 * so calls work no matter what page the user is on.
 */
export const CallManager = () => (
  <>
    <IncomingCallModal />
    <ActiveCallScreen />
  </>
);
