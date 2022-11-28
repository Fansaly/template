export interface LoadMoreText {
  loading?: string;
  loadmore?: string;
  nomore?: string;
}

export interface LoadMoreState {
  status: string;
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
}

export type PageQuery = Pick<LoadMoreState, 'pageNum' | 'pageSize'>;
export type LoadMoreRequest<T = any> = (params: PageQuery) => Promise<T>;
export type LoadMore<T = any> = (reload?: boolean) => Promise<T>;
