import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userAuthApi = createApi({
	reducerPath: "userAuthApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (user) => {
				return {
					url: 'register/',
					method: 'POST',
					body: user,
					headers: { 'Content-Type': 'application/json' }
				}
			}
		}),
		loginUser: builder.mutation({
			query: (user) => {
				return {
					url: 'login/',
					method: 'POST',
					body: user,
					headers: { 'Content-Type': 'application/json' }
				}
			}
		}),
		getUser: builder.query({
			query: (access_token) => {
				return {
					url: 'profile/',
					headers: { 'authorization': `Bearer ${access_token}` }
				}
			}
		}),
		changeUserPass: builder.mutation({
			query: ({ access_token, newdata }) => {
				return {
					url: 'changepassword/',
					method: 'POST',
					body: newdata,
					headers: { 'authorization': `Bearer ${access_token}` }
				}
			}
		}),
		sendPasswordResetEmail: builder.mutation({
			query: (useremail) => {
				return {
					url: 'sendemailresetpassword/',
					method: 'POST',
					body: useremail,
					headers: { 'Content-Type': 'application/json' }
				}
			}
		}),
		newPasswordReset: builder.mutation({
			query: ({ token, uid, newdata }) => {
				return {
					url: `resetpassword/${uid}/${token}/`,
					method: 'POST',
					body: newdata,
					headers: { 'Content-Type': 'application/json' }
				}
			}
		}),
	})
})

export const { useRegisterUserMutation, useSendPasswordResetEmailMutation, useLoginUserMutation, useGetUserQuery, useChangeUserPassMutation, useNewPasswordResetMutation } = userAuthApi