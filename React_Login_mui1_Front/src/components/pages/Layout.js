import { Outlet } from "react-router-dom";
import Navbar from "../NavbarComp"
import { CssBaseline } from "@mui/material";


const Layout = (props) => {
	return (
		<>
			<CssBaseline />
			<Navbar />
			<Outlet />
		</>
	)
};




export default Layout;
