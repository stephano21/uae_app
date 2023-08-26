//Api Login

export interface TokenResponse {
  access_token: string;
  token_type: string;
  userName: string;
}

//ApirError

export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
