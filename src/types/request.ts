export interface ApiResponseDataType<T = any> {
  code: number;
  data: T;
  msg: string;
}
