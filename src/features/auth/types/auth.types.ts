// User 는 shared로 옮길 수 있음
export interface User {
  id: string;
  nickname: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// export interface RefreshTokenResponse {

// }
