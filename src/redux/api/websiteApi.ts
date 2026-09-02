import type { PaymentStatusResponse } from "@/types/payment";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


interface Response {
  data: any | void;
}

export const websiteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqs: build.query<Response, any>({
      query: (params) => ({
        url: `/fandq/all`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.user],
    }),

    getCategories: build.query({
      query: () => {
        return {
          url: `/categories`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.categories],
    }),
    getCategoriesRate: build.query({
      query: (params) => {
        return {
          url: `/categories/with-stats`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.categories],
    }),
    searchProviders: build.query({
      query: (params) => {
        return {
          url: `/users/search-providers`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.providers],
    }),
    providerDetails: build.query({
      query: (id) => {
        return {
          url: `/users/provider/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.providers],
    }),
    booking: build.mutation({
      query: (body) => {
        return {
          url: `/bookings`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),

    ////Tickets
    getMyTickets: build.query({
      query: (params) => {
        return {
          url: `/support/my-tickets`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.tickes],
    }),
    getSingleTicket: build.query({
      query: (id) => {
        return {
          url: `/support/${id}`,
        };
      },
      providesTags: [tagTypes.tickes],
    }),
    createTicket: build.mutation({
      query: (body) => {
        return {
          url: `/support/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagTypes.tickes],
    }),

    //Review
    getMyReviews: build.query({
      query: (params) => {
        return {
          url: `/reviews/my-reviews`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.review],
    }),
    getSingleReviews: build.query({
      query: (id) => {
        return {
          url: `/reviews/booking/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.review],
    }),
    createReview: build.mutation({
      query: (body) => {
        return {
          url: `/reviews/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagTypes.review],
    }),
    updateReview: build.mutation({
      query: (body) => {
        return {
          url: `/reviews/${body.id}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.review, tagTypes.bookings],
    }),
    deleteReview: build.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.review, tagTypes.bookings],
    }),
    replyReview: build.mutation({
      query: (body) => {
        return {
          url: `/reviews/${body.id}/reply`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.review],
    }),
    ///favorites
    getFavorite: build.query({
      query: () => {
        return {
          url: `/users/favorites`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.favorite],
    }),
    addFavorite: build.mutation({
      query: (id) => {
        return {
          url: `/users/favorites/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.favorite],
    }),
    removeFavorite: build.mutation({
      query: (id) => {
        return {
          url: `/users/favorites/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.favorite],
    }),
    //
    getAllBookings: build.query({
      query: (params) => {
        return {
          url: `/bookings/my`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.bookings],
    }),
    acceptBooking: build.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}/accept`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),
    declineBooking: build.mutation({
      query: (body) => {
        return {
          url: `/bookings/${body.id}/decline`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),

    withdrawBooking: build.mutation({
      query: (body) => {
        return {
          url: `/bookings/${body.id}/withdraw`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),

    cancelBooking: build.mutation({
      query: (body) => {
        return {
          url: `/bookings/${body.id}/cancel`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),

    startBooking: build.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}/start`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),
    doneBooking: build.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}/complete-job`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),
    confirmBooking: build.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}/confirm-completion`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.bookings],
    }),
    getPaymentByBookingId: build.query<PaymentStatusResponse, string>({
      query: (bookingId) => ({
        url: `/payments/booking/${bookingId}`,
        method: "GET",
      }),
    }),
    //
    getTransactions: build.query({
      query: (params) => {
        return {
          url: `/payments/my`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.bookings],
    }),

    ///Reports
    createReport: build.mutation({
      query: (body) => {
        return {
          url: `/reports`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagTypes.report],
    }),

    ////Availability
    myAvailability: build.query({
      query: (params) => {
        return {
          url: `/availability/my-availability`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.availability],
    }),

    updateAvailabilityRules: build.mutation({
      query: (body) => {
        return {
          url: `/availability/booking-rules`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [tagTypes.availability],
    }),
    addDayAvailability: build.mutation({
      query: (body) => {
        return {
          url: `/availability/day/${body.day}/slots`,
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.availability],
    }),
    isDayAvailability: build.mutation({
      query: (body) => {
        return {
          url: `/availability/day/${body.day}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.availability],
    }),
    updateTimeAvailability: build.mutation({
      query: (body) => {
        return {
          url: `/availability/day/${body.day}/slots/${body.id}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: [tagTypes.availability],
    }),
    deleteTimeAvailability: build.mutation({
      query: (body) => {
        return {
          url: `/availability/day/${body.day}/slots/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.availability],
    }),
    /// Overview
    myOverview: build.query({
      query: () => {
        return {
          url: `/overview/my`,
          method: "GET",
        };
      },
    }),

    ////
    allFeedback: build.query({
      query: () => {
        return {
          url: `/feedback`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.feedback],
    }),

    createFeedback: build.mutation({
      query: (body) => {
        return {
          url: `/feedback/add`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagTypes.feedback],
    }),

    ///END
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesRateQuery,
  useSearchProvidersQuery,
  useProviderDetailsQuery,
  useBookingMutation,
  ////Tickets
  useGetMyTicketsQuery,
  useCreateTicketMutation,
  useGetSingleTicketQuery,
  ////Review
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useReplyReviewMutation,
  useGetSingleReviewsQuery,

  //favorites
  useGetFavoriteQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  //getBookings
  useGetAllBookingsQuery,
  useAcceptBookingMutation,
  useDeclineBookingMutation,
  useWithdrawBookingMutation,
  useCancelBookingMutation,
  useStartBookingMutation,
  useDoneBookingMutation,
  useConfirmBookingMutation,
  useLazyGetPaymentByBookingIdQuery,
  ///transactions
  useGetTransactionsQuery,
  ///reports
  useCreateReportMutation,
  ///availability
  useMyAvailabilityQuery,
  useUpdateAvailabilityRulesMutation,
  useAddDayAvailabilityMutation,
  useIsDayAvailabilityMutation,
  useUpdateTimeAvailabilityMutation,
  useDeleteTimeAvailabilityMutation,
  //
  useMyOverviewQuery,
  ///
  useAllFeedbackQuery,
  useCreateFeedbackMutation,
} = websiteApi;
