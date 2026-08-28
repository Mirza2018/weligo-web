import { createBrowserRouter, Navigate } from "react-router-dom";

import { ChooseRole } from "@/pages/auth/choose-account";
import { ComingSoon } from "../components/comingSoon/ComingSoon";
import { DashboardLayout } from "../layouts/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import ProviderDashboardLayout from "../layouts/ProviderDashboardLayout";
import { AboutPage } from "../pages/AboutPage";
import { SignIn } from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";
import { BookingDetailsPage } from "../pages/DashboardPage/Family/BookingDetailsPage";
import { BookingsPage } from "../pages/DashboardPage/Family/BookingsPage";
import { FavoritesPage } from "../pages/DashboardPage/Family/FavoritesPage";
import { HelpAndSupportPage } from "../pages/DashboardPage/Family/HelpAndSupportPage";
import { OverviewPage } from "../pages/DashboardPage/Family/OverviewPage";
import { ProfileSettingsPage } from "../pages/DashboardPage/Family/ProfileSettingsPage";
import { ReviewsPage } from "../pages/DashboardPage/Family/ReviewsPage";
import { TransactionsPage } from "../pages/DashboardPage/Family/TransactionsPage";
import { ProviderCalendarPage } from "../pages/DashboardPage/Provider/Calendar";
import { ProviderEarningsPage } from "../pages/DashboardPage/Provider/Earnings";
import { ProviderBookings } from "../pages/DashboardPage/Provider/ProviderBookings";
import { ProviderOverviewPage } from "../pages/DashboardPage/Provider/ProviderOverviewPage";
import { ProvidersBookingDetailsPage } from "../pages/DashboardPage/Provider/ProvidersBookingDetailsPage";

import CreatorProgram from "@/components/legal/CreatorProgram";
import Legal from "@/components/legal/Legal";
import Privacy from "@/components/legal/Privacy";
import Terms from "@/components/legal/Terms";
import MessagePage from "@/components/messages/MessagePage";
import { AboutYou } from "@/pages/auth/about-you";
import { AddCertificates } from "@/pages/auth/add-certificates";
import { MoreInfo } from "@/pages/auth/more-info";
import { MoreInfoProvider } from "@/pages/auth/more-info-provider";
import { ServiceSelection } from "@/pages/auth/service-selection";
import { SignUpProvider } from "@/pages/auth/sign-up-provider";
import { SubmitCode } from "@/pages/auth/submit-code";
import { SubmitCodeProvider } from "@/pages/auth/submit-code-provider";
import { WelcomeToWeligo } from "@/pages/auth/welcome-weligo";
import { WelcomeToWeligoProvider } from "@/pages/auth/welcome-weligo-provider";
import { ProfileSettingsPageProvider } from "@/pages/DashboardPage/Family/ProfileSettingsPageProvider";
import Availability from "@/pages/DashboardPage/Provider/Availability";
import { ProviderReviewsPage } from "@/pages/DashboardPage/Provider/ProviderReviewsPage";
import { ForFamiliesPage } from "../pages/ForFamiliesPage";
import { ForProvidersPage } from "../pages/ForProvidersPage";
import { Home } from "../pages/Home";
import { HowItWorksPage2 } from "../pages/HowItWorksPage2";
import { PurchasePage } from "../pages/PurchasePage";
import { Services } from "../pages/Services";
import ProvidersDetails from "../pages/Services/ProvidersDetails";
import ServiceProvider from "../pages/Services/ServiceProvider";

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
        path: "services/:serviceId/providers",
        element: <ServiceProvider />,
      },
      {
        path: "services/:serviceId/providers/:providerId",
        element: <ProvidersDetails />,
      },
      {
        path: "services/:serviceId/providers/:providerId/purchase",
        element: <PurchasePage />,
      },
      {
        path: "for-families",
        element: <ForFamiliesPage />,
      },
      {
        path: "for-providers",
        element: <ForProvidersPage />,
      },
      {
        path: "how-it-works",
        // element: <HowItWorksPage />,
        element: <HowItWorksPage2 />,
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "waitlist",
        element: <ComingSoon />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "policy",
        element: <Privacy />,
      },
      {
        path: "legal",
        element: <Legal />,
      },
      {
        path: "creator-program",
        element: <CreatorProgram />,
      },
    ],
  },
  {
    path: "/dashboard/family",
    element: <DashboardLayout />,
    children: [
      {
        path: "overview",
        element: <OverviewPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "bookings/:id",
        element: <BookingDetailsPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "help",
        element: <HelpAndSupportPage />,
      },
      {
        path: "message",
        element: <MessagePage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "settings",
        element: <ProfileSettingsPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
    ],
  },
  {
    path: "/dashboard/provider",
    element: <ProviderDashboardLayout />,
    children: [
      {
        path: "overview",
        element: <ProviderOverviewPage />,
      },
      {
        path: "bookings",
        element: <ProviderBookings />,
        // element: <BookingsPage />,
      },
      {
        path: "bookings/:id",
        element: <ProvidersBookingDetailsPage />,
      },
      {
        path: "calendar",
        element: <ProviderCalendarPage />,
      },
      {
        path: "availability",
        element: <Availability />,
      },
      {
        path: "earnings",
        element: <ProviderEarningsPage />,
      },
      {
        path: "help",
        element: <HelpAndSupportPage />,
      },
      {
        path: "message",
        element: <MessagePage />,
      },
      {
        path: "reviews",
        element: <ProviderReviewsPage />,
      },
      {
        path: "settings",
        element: <ProfileSettingsPageProvider />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/choose-account",
    element: <ChooseRole />,
  },
  {
    path: "/sign-up-family",
    element: <SignUp />,
  },

  {
    path: "/verify-family",
    element: <SubmitCode />,
  },
  {
    path: "/more-info",
    element: <MoreInfo />,
  },
  {
    path: "/welcome-weligo",
    element: <WelcomeToWeligo />,
  },

  //
  {
    path: "/sign-up-provider",
    element: <SignUpProvider />,
  },
  {
    path: "/verify-provider",
    element: <SubmitCodeProvider />,
  },
  {
    path: "/service-selection",
    element: <ServiceSelection />,
  },
  {
    path: "/add-certificates",
    element: <AddCertificates />,
  },
  {
    path: "/about-you",
    element: <AboutYou />,
  },
  {
    path: "/more-info-provider",
    element: <MoreInfoProvider />,
  },
  {
    path: "/welcome-weligo-provider",
    element: <WelcomeToWeligoProvider />,
  },
]);

export default router;
