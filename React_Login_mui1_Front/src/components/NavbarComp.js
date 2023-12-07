import { Box, AppBar, Typography, Button, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/localstorageservice";
import Dashboard from "../components/pages/Dashboard"

function Navbar() {
	let { access_token, refresh_token } = getToken()
	return (
		<>
			<Box>
				<AppBar position="static" color="secondary">
					<Toolbar>
						<Typography variant="h5" sx={{ flexGrow: 1 }}>z
							My-Shop
						</Typography>
						<Button variant="outlined" component={NavLink} to="/" color="inherit" style={({ isActive }) => {
							return { backgroundColor: isActive ? "maroon" : "" }
						}}>home</Button>
						<Button sx={{ margin: 1 }} variant="outlined" component={NavLink} to="/contact" style={({ isActive }) => {
							return { backgroundColor: isActive ? "maroon" : "" }
						}} color="inherit">Contact</Button>

						{access_token ? <Button variant="outlined" component={NavLink} to="/Dashboard" style={({ isActive }) => {
							return { backgroundColor: isActive ? "#2d46cf" : "" }
						}} color="inherit" >Dashboard</Button> : <Button variant="outlined" component={NavLink} to="/loginregpage" style={({ isActive }) => {
							return { backgroundColor: isActive ? "#2d46cf" : "" }
						}} color="inherit" >login / registration</Button>}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}



export default Navbar;