// src/types/favorites.ts

export interface FavoriteCategoryRef {
  _id: string;
  name: string;
}

export interface FavoriteItem {
  _id: string;
  fullName: string;
  profileImage: string;
  address: string;
  role: string;
  categoryId?: FavoriteCategoryRef | null;
  hourlyRate: number;
  totalReview: number;
  averageRating: number;
}

export interface FavoritesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FavoriteItem[];
}
