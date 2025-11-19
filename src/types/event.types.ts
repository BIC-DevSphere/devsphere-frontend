export interface EventSchedule {
  id?: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EventImage {
  id?: string;
  imageUrl?: string;
  imageType: 'PROMOTIONAL' | 'GALLERY' | 'GUESTS';
  publicId?: string;
  uploadedAt?: string;
}

export interface EventRequest {
  name: string;
  description: string;
  status: 'UPCOMING' | 'COMPLETED';
  eventSchedule: EventSchedule[];
  thumbnail?: File | null;
}

export interface EventResponse {
  id: string;
  name: string;
  description: string;
  status: 'UPCOMING' | 'COMPLETED';
  eventSchedule: EventSchedule[];
  images?: EventImage[];
  thumbnailUrl?: string; // Keep for backward compatibility
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
}

export interface EventsResponse {
  success: boolean;
  message: string;
  code: number;
  data: EventResponse[];
  pagination: Pagination;
}
