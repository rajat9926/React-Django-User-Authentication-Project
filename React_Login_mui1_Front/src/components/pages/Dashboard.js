import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePasswordDashboard from "./authpage/ChangePasswordDashboard";
import { getToken, removeToken } from "../../services/localstorageservice";
import Navbar from "../NavbarComp";
import { useDispatch, useSelector } from "react-redux";
import { UnsetUserToken } from "../../features/authSlice";
import { useGetUserQuery } from "../../services/userauthapi";
import { useEffect } from "react";
import { UnsetUserData, setUserData } from "../../features/userSlice";


const Dashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { access_token } = getToken()
	const { data, isSuccess } = useGetUserQuery(access_token)
	const userdata = useSelector(state => state.user)

	const handleLogout = () => {
		console.log("logout clicked");
		dispatch(UnsetUserToken({ access_token: null }))
		dispatch(UnsetUserData({}))
		removeToken()
		navigate("/loginregpage")
	}

	useEffect(() => {
		if (data && isSuccess) {
			dispatch(setUserData({ email: data.email, name: data.name }))
		}
	}, [data, isSuccess])

	return (
		<>
			<Navbar />
			<CssBaseline />
			<Grid container>
				<Grid item sm={3.8} sx={{ backgroundColor: "grey", padding: 5, color: 'white' }}>
					<Typography variant="h5">Email : {userdata.email}</Typography>
					<Typography variant="h5">Name : {userdata.name}</Typography>
					<Button onClick={handleLogout} variant="contained" color="warning">LOgout</Button>
				</Grid>
				<Grid item sm={8} padding={2}>
					<ChangePasswordDashboard />
				</Grid>
			</Grid>
		</>
	);
};

export default Dashboard;
