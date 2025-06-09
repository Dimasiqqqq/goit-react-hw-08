import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations";

const INITIAL_STATE = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
	isError: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: INITIAL_STATE,
	extraReducers: (builder) =>
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(logout.fulfilled, () => {
				return INITIAL_STATE;
			})

			//   REFRESH
			.addCase(refresh.pending, (state) => {
				state.isRefreshing = true;
				state.isError = false;
			})
			.addCase(refresh.fulfilled, (state, action) => {
				state.isRefreshing = false;
				state.user = action.payload;
				state.isLoggedIn = true;
			})
			.addCase(refresh.rejected, (state) => {
				state.isRefreshing = false;
				state.isError = true;
			})

			.addMatcher(isAnyOf(register.pending, login.pending, logout.pending), (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addMatcher(isAnyOf(register.rejected, login.rejected, logout.rejected), (state) => {
				state.isLoading = false;
				state.isError = true;
			}),
});

export const authReducer = authSlice.reducer;