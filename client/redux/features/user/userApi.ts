import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        updateAvatar: builder.mutation({

            query: (avatar) => ({

                url: 'user/update-user-avatar',
                method: 'PUT',
                body: { avatar },
                credentials: 'include' as const

            })

        }),

        EditProfile: builder.mutation({

            query: ({ name }) => ({

                url: 'user/update-user-infor',
                method: 'PUT',
                body: { name },
                credentials: 'include' as const

            })

        }),

        updatePassword: builder.mutation({

            query: ({ oldPassword, newPassword }) => ({

                url: 'user/update-user-password',
                method: 'PUT',
                body: { oldPassword, newPassword },
                credentials: 'include' as const

            })

        }),

        getAllUsers: builder.query({

            query: () => ({

                url: "user/get-users",
                method: "GET",
                credentials: 'include' as const

            })

        }),

        updateUserRole: builder.mutation({

            query: ({ email, role }) => ({

                url: 'user/update-user',
                method: 'PUT',
                body: { email, role },
                credentials: 'include' as const
            })

        }),

        deleteUser: builder.mutation({

            query: () => ({

                url: 'user/delete-user/:id',
                method: 'DELETE',
                credentials: 'include' as const

            })

        })

    })

})

export const {
    useUpdateAvatarMutation,
    useEditProfileMutation,
    useUpdatePasswordMutation,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation
} = userApi