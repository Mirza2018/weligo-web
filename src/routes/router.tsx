import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { ComingSoon } from "../components/comingSoon/ComingSoon";
import { Services } from "../pages/Services";
import { SignIn } from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "for-families",
        element: <ComingSoon />,
      },
      {
        path: "for-providers",
        element: <ComingSoon />,
      },
      {
        path: "how-it-works",
        element: <ComingSoon />,
      },
      {
        path: "about-us",
        element: <ComingSoon />,
      },
      {
        path: "waitlist",
        element: <ComingSoon />,
      },
    ],
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
