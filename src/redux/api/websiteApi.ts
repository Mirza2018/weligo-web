import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

interface Filter {
  page?: number;
  limit?: number;
  search?: string;
}
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
      query: () => {
        return {
          url: `/bookings/my`,
          method: "GET",
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
  ///transactions
  useGetTransactionsQuery,
  ///reports
  useCreateReportMutation,
} = websiteApi;
