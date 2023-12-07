import { Box, TextField, Button, Grid, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../../services/userauthapi";
import { useState } from "react";




const PasswordReset = () => {

	let navigate = useNavigate()
	const [sendemailresetpassword, { isLoading }] = useSendPasswordResetEmailMutation()
	const [D, setD] = useState("")
	const [E, setE] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		let data = new FormData(e.currentTarget)
		let useremail = { email: data.get('email') };
		let res = await sendemailresetpassword(useremail)
		if (res.error) {
			setD("")
			setE(res.error.data.errors);
			console.log(res.error.data.errors)
		}
		if (res.data) {
			setE("")
			setD(res.data.msg);
			console.log(res.data.msg)
			document.getElementById("reset-form").reset()
		}
	}

	return (
		<>
			<Grid container justifyContent={"center"}>
				<Grid item>
					<Box component='form' noValidate sx={{ mt: 2 }} id="reset-form" textAlign='center' onSubmit={handleSubmit}>
						<TextField margin="normal" required name='email' label='Email' type="email" fullWidth />
						<Button sx={{ paddingX: 5 }} type="submit" variant="contained">Send Mail</Button>
					</Box>
					<Box margin={2}>
						{E.email ? <Alert severity="error">{E.email[0]}</Alert> : ""}
						{E.non_field_errors ? <Alert severity="error">{E.non_field_errors[0]}</Alert> : ""}
						{isLoading ? <Alert>Loading Please Wait.........</Alert> : "" | D ? <Alert>{D}</Alert> : ""}
						{!isLoading && D ? <Alert>{D}</Alert> : ""}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};





export default PasswordReset;
