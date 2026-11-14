// src/events/interfaces/event.interface.ts
export interface Session {
  id: string;
  eventId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  room: string;
  
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: string; // ISO string
  category: string;
  isPublished: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}