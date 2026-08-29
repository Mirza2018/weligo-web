// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { RootState } from "@/redux/store";

interface DecodedToken {
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  role: "family" | "provider" | "admin";
  iat: number;
  exp: number;
}

type Role = DecodedToken["role"];

interface ProtectedRouteProps {
  allowedRoles: Role[];
  redirectTo?: string;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = "/sign-in",
}: ProtectedRouteProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  let decodedToken: DecodedToken | null = null;
  try {
    decodedToken = jwtDecode<DecodedToken>(accessToken);
  } catch {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  const isExpired = decodedToken.exp * 1000 < Date.now();
  if (isExpired) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(decodedToken.role)) {
    // Logged in, but wrong role for this route.
    // - family/provider hitting the wrong dashboard -> send to their own
    // - admin (or anything else) -> no dashboard for them here, send home
    const fallback =
      decodedToken.role === "family"
        ? "/dashboard/family/overview"
        : decodedToken.role === "provider"
          ? "/dashboard/provider/overview"
          : "/";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
