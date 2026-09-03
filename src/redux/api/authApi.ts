import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

// interface Filter {
//   page?: number;
//   limit?: number;
//   search?: string;
// }
interface Response {
  data: any | void;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegister: build.mutation({
      query: (body) => ({
        url: `/users/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userVerifyOTP: build.mutation<Response, any>({
      query: (body) => ({
        url: `/users/create-user-verify-otp`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userVerifyOTPResend: build.mutation<Response, any>({
      query: (body) => ({
        url: `/otp/resend-otp`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userUpdateFamilyProfile: build.mutation<Response, any>({
      query: (body) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userUpdateProviderProfile: build.mutation<Response, any>({
      query: (body) => ({
        url: `/users/provider-profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userProfile: build.query<Response, any>({
      query: () => ({
        url: `/users/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    userPasswordChange: build.mutation<Response, any>({
      query: (body) => ({
        url: `/auth/change-password`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: build.mutation<Response, any>({
      query: (body) => ({
        url: `/auth/forgot-password-otpByEmail`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPasswordOTP: build.mutation<Response, any>({
      query: (body) => ({
        url: `/auth/forgot-password-otp-match`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPasswordReset: build.mutation<Response, any>({
      query: (body) => ({
        url: `/auth/forgot-password-reset`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //End
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserVerifyOTPMutation,
  useUserVerifyOTPResendMutation,
  useUserUpdateProviderProfileMutation,
  useUserProfileQuery,
  useUserPasswordChangeMutation,
  useUserUpdateFamilyProfileMutation,
  useForgotPasswordMutation,
  useForgotPasswordOTPMutation,
  useForgotPasswordResetMutation,
} = authApi;
