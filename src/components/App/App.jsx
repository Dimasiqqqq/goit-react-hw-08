import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refresh } from "../../redux/auth/operations";
import Layout from "../Layout/Layout";
// import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));

const App = () => {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refresh());
	}, [dispatch]);

	return isRefreshing ? (
		<b>Refreshing user...</b>
	) : (
		<Layout>
			<Suspense fallback={null}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/register"
						element={
							<RestrictedRoute>
								<RegistrationPage />
							</RestrictedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<RestrictedRoute>
								<LoginPage />
							</RestrictedRoute>
						}
					/>
					<Route
						path="/contacts"
						element={
							<PrivateRoute>
								<ContactsPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Suspense>
		</Layout>
	);
};

export default App;