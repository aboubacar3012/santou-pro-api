export class PaginationInfo {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class PaginatedResponseDto<T> {
  items: T[];
  pagination: PaginationInfo;
}
