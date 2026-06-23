import { createBrowserRouter } from "react-router-dom";

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
import { MessagePage } from "../pages/DashboardPage/Family/MessagePage";
import { OverviewPage } from "../pages/DashboardPage/Family/OverviewPage";
import { ProfileSettingsPage } from "../pages/DashboardPage/Family/ProfileSettingsPage";
import { ReviewsPage } from "../pages/DashboardPage/Family/ReviewsPage";
import { TransactionsPage } from "../pages/DashboardPage/Family/TransactionsPage";
import { ProviderCalendarPage } from "../pages/DashboardPage/Provider/Calendar";
import { ProviderEarningsPage } from "../pages/DashboardPage/Provider/Earnings";
import { ProviderHelpAndSupportPage } from "../pages/DashboardPage/Provider/HelpAndSupport";
import { ProviderBookings } from "../pages/DashboardPage/Provider/ProviderBookings";
import { ProviderOverviewPage } from "../pages/DashboardPage/Provider/ProviderOverviewPage";
import { ProvidersBookingDetailsPage } from "../pages/DashboardPage/Provider/ProvidersBookingDetailsPage";
import { ProviderReviewsPage } from "../pages/DashboardPage/Provider/Reviews";
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
        element:<HowItWorksPage2/>
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "waitlist",
        element: <ComingSoon />,
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
        path: "earnings",
        element: <ProviderEarningsPage />,
      },
      {
        path: "help",
        element: <ProviderHelpAndSupportPage />,
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
        element: <ProfileSettingsPage />,
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
