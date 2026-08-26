// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import "./index.css";
// import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import router from "./routes/router";
import Providers from "./redux/lib/Providers";
import { I18nProvider } from "./lib/i18n";
import { TooltipProvider } from "./components/ui/tooltip";
import { GoogleMapsProvider } from "./lib/googleMaps";
import { SocketProvider } from "./providers/SocketProvider";
import { CallProvider } from "./components/providers/CallProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <SocketProvider>
        <CallProvider>
          <TooltipProvider>
            <Toaster richColors position="top-center" />
            <I18nProvider>
              {/* <ScrollToTop /> */}
              <GoogleMapsProvider>
                <RouterProvider router={router} />
              </GoogleMapsProvider>
            </I18nProvider>
          </TooltipProvider>
        </CallProvider>
      </SocketProvider>
    </Providers>
  </StrictMode>,
);
