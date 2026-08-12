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

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // addFaqs: build.mutation<Response, any>({
    //   query: (body) => ({
    //     url: `/fandq`,
    //     method: "POST",
    //     body,
    //   }),
    //   // invalidatesTags: [tagTypes.faq],
    // }),
    // updateFaq: build.mutation<Response, any>({
    //   query: ({ id, data }) => ({
    //     url: `/fandq/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   // invalidatesTags: [tagTypes.faq],
    // }),

    // deleteFaq: build.mutation<Response, any>({
    //   query: (id) => ({
    //     url: `/fandq/${id}`,
    //     method: "DELETE",
    //   }),
    //   // invalidatesTags: [tagTypes.faq],
    // }),

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
      providesTags: [tagTypes.categories],
    }),

    ///END
  }),
});

export const { useGetCategoriesQuery, useGetCategoriesRateQuery, useSearchProvidersQuery } = authApi;
