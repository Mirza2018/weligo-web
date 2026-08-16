// src/types/website.ts

export interface Category {
  _id: string;
  order: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  status: "active" | "coming_soon";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderCategoryRef {
  _id: string;
  name: string;
}

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface Provider {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage: string;
  role: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  categoryId: ProviderCategoryRef;
  category: string;
  hourlyRate: number;
  experience: number;
  lenguages: string[];
  totalReview: number;
  averageRating: number;
  location: GeoPoint;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ApiMeta;
  data: T[];
}

export type SortBy = "nearest" | "top_rated" | "price_low" | "price_high";

// Params sent to /users/search-providers
export interface SearchProvidersParams {
  categoryId: string; // mandatory - endpoint does not return usable results without it
  search?: string; // matches provider title/name and address
  date?: string; // YYYY-MM-DD, optional
  time?: string; // HH:mm, optional
  lat?: number; // optional
  lng?: number; // optional
  sortBy?: SortBy;
  page?: number;
  limit?: number;
}

// The values the Home search bar collects before navigating
export interface HomeSearchState {
  categoryId: string | null;
  categoryName: string | null;
  locationLabel: string | null;
  lat: number | null;
  lng: number | null;
  date: Date | null;
  time: string | null; // "HH:mm"
}
