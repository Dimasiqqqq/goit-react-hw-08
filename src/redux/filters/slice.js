import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		name: "",
	},
	reducers: {
		changeFilter(state, action) {
			state.name = action.payload;
		},
	},
});

// Експортуємо генератори екшенів та редюсер
export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;