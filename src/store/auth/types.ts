// types/auth.ts
export interface UserData {
  id?: string;
  name?: string;
  email?: string;
  // add more fields depending on your API response
  [key: string]: any;
}

export interface AuthState {
  token: string | null;
  user_data: UserData;
  role: string;
}
