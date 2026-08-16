// src/types/reviews.ts
import type { ApiMeta } from "./website";

export interface ReviewPersonRef {
  _id: string;
  fullName: string;
  profileImage: string;
}

export interface ReviewReply {
  comment: string;
  repliedAt: string;
}

export interface ReviewListItem {
  _id: string;
  bookingId: string;
  // The API populates whichever side isn't "me": the reviewer (family) when
  // viewed by the provider being reviewed, or (symmetrically) the receiver
  // when viewed by the family who wrote it. The other side stays a raw id.
  reviewerId: ReviewPersonRef | string;
  receiverId: ReviewPersonRef | string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  reply?: ReviewReply;
}

export interface MyReviewsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export interface MyReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ApiMeta;
  data: ReviewListItem[];
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export interface UpdateReviewPayload {
  id: string;
  data: UpdateReviewData;
}

export interface ReplyReviewData {
  comment: string;
}

export interface ReplyReviewPayload {
  id: string;
  data: ReplyReviewData;
}

export interface ReviewMutationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewListItem;
}

export interface DeleteReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
}

export function isPopulatedPerson(
  ref: ReviewPersonRef | string,
): ref is ReviewPersonRef {
  return typeof ref === "object" && ref !== null;
}
