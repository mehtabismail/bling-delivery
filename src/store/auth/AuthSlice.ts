import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "./types";

const initialState: AuthState = {
  token: null,
  user_data: {},
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeToken: (state: AuthState, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserData: (state: AuthState, action: PayloadAction<UserData>) => {
      state.user_data = action.payload;
    },
    setingRole: (state: AuthState, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    logout: () => ({ ...initialState }),
  },
});

export const { storeToken, setUserData, setingRole, logout } =
  authSlice.actions;

export default authSlice.reducer;
