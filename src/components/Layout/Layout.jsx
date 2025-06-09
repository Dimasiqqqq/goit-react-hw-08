import { AppBar } from "../AppBar/AppBar";

const Layout = ({ children }) => {
	return (
		<div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>
			<AppBar />
			<main>{children}</main>
		</div>
	);
};

export default Layout;