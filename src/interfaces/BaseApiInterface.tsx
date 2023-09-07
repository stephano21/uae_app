//Api Login

/* export interface TokenResponse {
  access_token: string;
  token_type: string;
  userName: string;
} */

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
//ApirError

export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
