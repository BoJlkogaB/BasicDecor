import { UserPayload } from './users.types';

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  user: UserPayload;
}

export interface RefreshResponse {
  accessToken: string;
  user: UserPayload;
}
