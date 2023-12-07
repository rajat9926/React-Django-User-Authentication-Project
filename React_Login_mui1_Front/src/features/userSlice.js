import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	email: "",
	name: ""
}


export const userSlice = createSlice({
	name: 'userdata',
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.email = action.payload.email
			state.name = action.payload.name
		},
		UnsetUserData: (state, action) => {
			state.name = action.payload.name
			state.email = action.payload.email
		},
	}
})

export default userSlice.reducer
export const {setUserData,UnsetUserData} = userSlice.actions