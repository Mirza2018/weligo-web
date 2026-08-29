// src/lib/currentUser.ts
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export interface DecodedUserToken {
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export function decodeAccessToken(
  token: string | null | undefined,
): DecodedUserToken | null {
  if (!token) return null;
  try {
    return jwtDecode<DecodedUserToken>(token);
  } catch {
    return null;
  }
}

/** The logged-in user's own id/name/role, decoded from the access token. */
export function useCurrentUser(): DecodedUserToken | null {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return decodeAccessToken(token);
}
