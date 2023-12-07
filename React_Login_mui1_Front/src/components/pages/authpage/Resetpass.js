import { Box, Button, Grid, TextField, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useNewPasswordResetMutation } from "../../../services/userauthapi";
import { useState } from "react";

const Resetpass = () => {
	const [D, setD] = useState("")
	const [E, setE] = useState("")
	let navigate = useNavigate()
	const [newpass, { isLoading }] = useNewPasswordResetMutation()
	const { uid, token } = useParams()

	const handleReset = async (e) => {
		e.preventDefault()
		let data = new FormData(e.currentTarget)
		let password = data.get('newpass');
		let cnfpassword = data.get('newcnfpass');
		let newdata = { cnfpassword: cnfpassword, password: password }
		let res = await newpass({ uid, token, newdata })
		if (res.error) {
			setD("")
			setE(res.error);
			console.log(res.error)
		}
		if (res.data) {
			setE("")
			setD(res.data);
			setTimeout(() => {
				navigate("/loginregpage")
			}, 3000)
			console.log(res.data)
		}
	}

	return (
		<>
			<Grid container justifyContent={"center"}>
				<Grid item>
					<h1>Reset Password</h1>
					<Box component='form' noValidate sx={{ mt: 2 }} id="reset-pass-form" textAlign='center' onSubmit={handleReset}>
						<TextField label='New Password' type='password' name='newpass' required fullWidth margin="normal" />
						{E.errors ? <Alert severity="error">{E.errors.password}</Alert> : ""}
						<TextField label='New Cnf Password' type='password' name='newcnfpass' required fullWidth margin="normal" />
						{E.errors ? <Alert severity="error">{E.errors.cnfpassword}</Alert> : ""}
						<Button sx={{ paddingX: 5 }} type="submit" variant="contained">Reset</Button>
					</Box>
					<Box margin={2}>
						{D ? <Alert>{D.msg}....Redirecting to login Page....</Alert> : ""}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Resetpass;
