export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserProfile {
  avatarUrl?: string;
  bio?: string;
  birthdate?: string;
}

export interface UserDto {
  id: string;
  username: string;
  profile?: UserProfile;
}
