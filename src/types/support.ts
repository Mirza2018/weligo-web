// src/types/support.ts
import type { ApiMeta } from "./website";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface TicketMessage {
  sender: string;
  message: string;
  attachment?: string;
  createdAt: string;
}

export interface TicketListItem {
  _id: string;
  user: string;
  subject: string;
  title: string;
  description: string;
  status: TicketStatus;
  messages: TicketMessage[];
  ticketNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketUserRef {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: string;
}

export interface TicketDetail extends Omit<TicketListItem, "user"> {
  user: TicketUserRef;
  __v?: number;
}

export interface MyTicketsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: TicketStatus;
}

export interface MyTicketsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ApiMeta;
  data: TicketListItem[];
}

export interface CreateTicketData {
  subject: string;
  title: string;
  description: string;
}

export interface CreateTicketPayload {
  data: CreateTicketData;
  attachment?: File | null;
}

export interface CreateTicketResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TicketListItem;
}

export interface SingleTicketResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TicketDetail;
}
