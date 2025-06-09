import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactReducer } from "./contacts/slice";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";

const authConfig = {
	key: "auth",
	storage,
	whitelist: ["token"],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authConfig, authReducer),
		contacts: contactReducer,
		filters: filtersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export const persistor = persistStore(store);