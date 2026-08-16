// src/types/auth.ts
import type { GeoPoint } from "./website";

export type UserRole = "family" | "provider" | "admin";

export interface AppUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: UserRole;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  location: GeoPoint;
  referralSource?: string;
  dateOfBirth: string | null;
  categoryId: string | null;
  category: string;
  hourlyRate: number;
  experience: number;
  lenguages: string[];
  totalReview: number;
  averageRating: number;
  providerProfileId: string | null;
  rejectionReason?: string;
  favoriteUsers: string[];
  status: string;
  isDeleted: boolean;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: AppUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  role: "family" | "provider";
  city: string;
  postalCode: string;
  address: string;
  location: GeoPoint;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    createUserToken: string;
  };
}

export interface VerifyOtpPayload {
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: string; // final JWT access token, account now exists
}

export interface ResendOtpPayload {
  purpose: "email-verification";
}

export interface ResendOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, never>;
}

export interface UpdateFamilyProfilePayload {
  phone?: string;
  referralSource?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  image?: File | null;
}

export interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AppUser;
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AppUser;
}

export interface PasswordChangePayload {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
}
