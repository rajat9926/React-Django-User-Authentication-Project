import { Box, Button, TextField, Alert, FormControlLabel, Checkbox, Typography } from "@mui/material";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../services/userauthapi";
import { useState } from "react";
import { StoreToken } from "../../../services/localstorageservice";




const Registration = () => {
	const navigate = useNavigate()
	const [registerUser] = useRegisterUserMutation()
	const [server_errors, setservererror] = useState({})

	const handleSubmit = async (e) => {
		e.preventDefault()
		let data = new FormData(e.currentTarget)
		let userdata = {
			email: data.get("email"),
			name: data.get("username"),
			password: data.get("pass"),
			password2: data.get("cnfpass"),
			tc: data.get("tc")
		}
		const res = await registerUser(userdata)
		if (res.error) {
			setservererror(res.error.data.errors)
		}
		if (res.data) {
			StoreToken(res.data.token)
			console.log(res.data);
			navigate('/Dashboard')
			document.getElementById("regi-form").reset()
		}
	}

	return (
		<>
			<Box component='form' noValidate id='regi-form' sx={{}} onSubmit={handleSubmit} textAlign={"center"}>
				<TextField label='Username' name='username' required fullWidth margin="normal" />
				{server_errors.name ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{server_errors.name[0]}</Typography > : ""}
				<TextField label='Email' type="email" name='email' required fullWidth margin="normal" />
				{server_errors.email ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{server_errors.email[0]}</Typography > : ""}
				<TextField label='Password' type='password' name='pass' required fullWidth margin="normal" />
				{server_errors.password ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{server_errors.password[0]}</Typography > : ""}
				<TextField label='Cnf Password' type='password' name='cnfpass' required fullWidth margin="normal" />
				{server_errors.password2 ? <Typography fontSize={12} textAlign={"left"} color={'red'}>{server_errors.password2[0]}</Typography > : ""}
				<FormControlLabel control={<Checkbox value={true} name="tc" />} label="i agree terms and conditions" />
				{server_errors.tc ? <Typography fontSize={12} textAlign={"center"} color={'red'}>{server_errors.tc[0]}</Typography > : ""}
				<Button type="submit" variant="contained">Join</Button>
			</Box>
		</>
	);
};

export default Registration;