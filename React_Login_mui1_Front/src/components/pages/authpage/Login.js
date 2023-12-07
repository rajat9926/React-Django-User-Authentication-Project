import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/userauthapi";
import { StoreToken, getToken } from "../../../services/localstorageservice";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../features/authSlice";


function Login() {
	const [loginUser, { isLoading }] = useLoginUserMutation()
	const [server_error, setServerError] = useState({})
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async (e) => {
		e.preventDefault()
		let data = new FormData(e.currentTarget)
		let userdata = {
			email: data.get('email'),
			password: data.get('password')
		}
		const res = await loginUser(userdata)

		if (res.error) {
			setServerError(res.error.data.error)
			console.log(server_error);
		}
		if (res.data) {
			console.log(res.data)
			StoreToken(res.data.token)
			let { access_token } = getToken()
			dispatch(setUserToken({ access_token: access_token }))
			navigate('/dashboard')
		}
	}

	let { access_token } = getToken()
	useEffect(() => {
		dispatch(setUserToken({ access_token: access_token }))
	}, [access_token, dispatch])

	return (
		<>
			<Box component='form' noValidate sx={{ mt: 2 }} id="login-form" textAlign='center' onSubmit={handleSubmit}>
				<TextField margin="normal" required name='email' label='Email' type="email" fullWidth />
				{server_error === 'non_field_error' | server_error === 'invalid credentials' ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{'this field is required'}</Typography > : ""}

				<TextField margin="normal" required name='password' label='Password' type="password" fullWidth />
				{server_error === 'non_field_error' | server_error === 'invalid credentials' ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{"this field is required"}</Typography > : ""}

				<Button sx={{ paddingX: 5 }} type="submit" variant="contained">Login</Button>
			</Box>
			<NavLink to="/resetpassword">Forget Password</NavLink>
			{server_error === 'non_field_error' ? <Alert severity="error">{'email & password is required'}</Alert> : ""}
		</>
	);
}



export default Login;
