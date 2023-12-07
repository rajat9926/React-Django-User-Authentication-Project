import { Box, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChangeUserPassMutation } from "../../../services/userauthapi";
import { getToken } from "../../../services/localstorageservice";
import { useState } from "react";

const ChangePasswordDashboard = () => {
	const navigate = useNavigate()
	const { access_token } = getToken()
	const [changepassword] = useChangeUserPassMutation()
	const [D, setD] = useState("")
	const [E, setE] = useState("")

	const handlePassChange = async (e) => {
		e.preventDefault()
		let data = new FormData(e.currentTarget)
		let newdata = {
			password: data.get('newpass'),
			cnfpassword: data.get('newcnfpass')
		}
		const res = await changepassword({ access_token, newdata })
		if (res.data.errors) {
			setE(res.data.errors.non_field_errors[0])
		}
		if (res.data) {
			setD(res.data.msg)
			document.getElementById("change-pass-form").reset()
		}
	}

	return (
		<>
			<Box component="form" id="change-pass-form" onSubmit={handlePassChange} sx={{ textAlign: "center" }} >
				<h1>Change Password Form</h1>
				<TextField label='New Password' type='password' name='newpass' required fullWidth margin="normal" />
				<TextField label='New Cnf Password' type='password' name='newcnfpass' required fullWidth margin="normal" />
				<Button sx={{ paddingX: 5 }} type="submit" variant="contained">Change IT</Button>
				{D ? <Alert>{D}</Alert> : E ? <Alert severity="error">{E}</Alert> : ""}
			</Box>
		</>
	);
};

export default ChangePasswordDashboard;