export interface Pagination{
  //{"currentPage":2,"itemsPerPage":3,"totalItems":10,"totalPages":4}
  currentPage:number;
  itemsPerPage : number;
  totalItems : number;
  totalPages: number;
}


export class PaginatedResults<T>{
  result? : T;
  pagination?: Pagination;
}
