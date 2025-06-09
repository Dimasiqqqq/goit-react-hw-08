import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);