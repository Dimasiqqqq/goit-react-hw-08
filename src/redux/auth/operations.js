import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  requestGetCurrentUser, 
  requestLogOut, 
  requestSignIn, 
  requestSignUp, 
  setToken 
} from "./services";

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    const { name, email, password } = formData || {};
    if (!name || !email || !password) {
      return thunkAPI.rejectWithValue("Name, email and password are required!");
    }

    try {
      const data = await requestSignUp({ name, email, password });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    const { email, password } = formData || {};
    if (!email || !password) {
      return thunkAPI.rejectWithValue("Email and password are required!");
    }

    try {
      const data = await requestSignIn({ email, password });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await requestLogOut();
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setToken(token);

    try {
      const data = await requestGetCurrentUser();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);
