export interface ServiceResponse<T> {
  ok: boolean;
  data: T;
  error?: string;
}
