import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestGetCurrentUser, requestLogOut, requestSignIn, requestSignUp, setToken } from "./services";

export const register = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
	try {
		const data = await requestSignUp(formData);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
	try {
		const data = await requestSignIn(formData);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await requestLogOut();
		return;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

export const refresh = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const token = state.auth.token;
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