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
    createReview: build.mutation({
      query: (body) => {
        return {
          url: `/reviews`,
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
      invalidatesTags: [tagTypes.review],
    }),
    deleteReview: build.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.review],
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
} = websiteApi;
