import { apiSlice } from "../api/apiSlice"
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice"

type RegistrationResponse = {

    message: string
    activationToken: string

}

type RegistrationData = {

    email: string

    name: string

    password: string

}

export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        register: builder.mutation<RegistrationResponse, RegistrationData>({

            query: (data) => ({

                url: "user/registration",
                method: "POST",
                body: data,
                credentials: 'include' as const

            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {

                    const result = await queryFulfilled

                    dispatch(userRegistration({

                        token: result.data.activationToken

                    }))

                } catch (error: any) {

                    console.log(error);

                }

            }

        }),

        activation: builder.mutation({

            query: ({ activation_token, activation_code }) => ({

                url: "user/activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code
                }

            })

        }),

        login: builder.mutation({

            query: ({ email, password }) => ({

                url: "user/login-user",
                method: "POST",
                body: {
                    email,
                    password
                },
                credentials: 'include' as const

            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {

                    const result = await queryFulfilled

                    dispatch(userLoggedIn({

                        accessToken: result.data.accessToken,
                        user: result.data.user


                    }))

                } catch (error: any) {

                    console.log(error);

                }

            }


        }),

        socialAuth: builder.mutation({

            query: ({ email, name, avatar }) => ({

                url: "user/social-auth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
                credentials: 'include' as const

            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {

                    const result = await queryFulfilled

                    dispatch(userLoggedIn({

                        accessToken: result.data.accessToken,
                        user: result.data.user


                    }))

                } catch (error: any) {

                    console.log(error);

                }

            }


        }),

        logout: builder.query({

            query: () => ({

                url: "user/logout-user",
                method: "GET",
                credentials: 'include' as const

            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {

                    dispatch(userLoggedOut())

                } catch (error: any) {

                    console.log(error);

                }

            }


        })

    })

})

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutQuery } = authApi