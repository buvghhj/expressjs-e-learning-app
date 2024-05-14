import React, { FC, useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button } from '@mui/material'
import { useTheme } from 'next-themes'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '../../../../redux/features/user/userApi'
import Link from 'next/link'
import { styles } from '../../../../app/styles/style'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'


type Props = {

    isTeam?: boolean

}

const AllUsers: FC<Props> = ({ isTeam }) => {

    const [active, setActive] = useState(false)

    const [email, setEmail] = useState("")

    const [role, setRole] = useState('admin')

    const [open, setOpen] = useState(false)

    const [userId, setUserId] = useState(false)

    const [updatedUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation()

    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({})

    const { isLoading, data, error, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })

    useEffect(() => {


        if (updateError) {

            if ('data' in updateError) {

                const errorMessage = updateError as any
                toast.error(errorMessage.data.message)

            }

        }

        if (isSuccess) {

            refetch()
            toast.success('User role updated successfully')
            setActive(false)

        }

        if (deleteError) {

            if ('data' in deleteError) {

                const errorMessage = deleteError as any
                toast.error(errorMessage.data.message)

            }

        }

        if (deleteSuccess) {

            refetch()
            toast.success('Delete user successfully')
            setActive(false)

        }


    }, [isSuccess, updateError, deleteSuccess, deleteError])

    const { theme, setTheme } = useTheme()

    const columns = [

        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: .5 },
        { field: "role", headerName: "Role", flex: .3 },
        { field: "courses", headerName: "Purchased Courses", flex: .5 },
        { field: "createdAt", headerName: "Created At", flex: .5 },
        {
            field: "",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {

                return (

                    <>

                        <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail className='dark:text-white text-black mt-4 ml-3' size={20} />
                        </a>

                    </>

                )

            }
        },
    ]

    const rows: any[] = []

    if (isTeam) {

        const newData = data && data.users.filter((item: any) => item.role === "admin")

        newData && newData.forEach((item: any) => {

            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt)
            })

        });

    } else {

        const newData = data && data.users.filter((item: any) => item.role === "user")


        newData && newData.forEach((item: any) => {

            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt)
            })

        });

    }



    const formik = useFormik({

        initialValues: { email: "", role: "" },

        onSubmit: async ({ email, role }) => {

            const data = { email, role }

            await updatedUserRole(data)

        }

    })

    const { values, handleChange, handleSubmit } = formik

    console.log(values);

    return (

        <div className='mt-[120px] ml-6'>

            {isLoading
                ?
                (<Loader />)
                :
                (
                    <Box m="20px">

                        {isTeam &&
                            (
                                <div className="w-full flex justify-end">
                                    <div className={`${styles.button} !w-[200px] bg-[#3e4396]`} onClick={() => setActive(!active)}>
                                        Add New Member
                                    </div>
                                </div>
                            )
                        }

                        {
                            isTeam ?
                                (
                                    <Box
                                        m="40px 0 0 0"
                                        height="70vh"

                                    >
                                        <DataGrid checkboxSelection rows={rows} columns={columns}
                                            pageSizeOptions={[10, 25, 50]}
                                            sx={{
                                                '.MuiDataGrid-columnSeparator': {
                                                    display: 'none',
                                                },
                                                '&.MuiDataGrid-root': {
                                                    border: 'none',
                                                },
                                                "& .MuiDataGrid-root": {
                                                    border: "none",
                                                    outline: "none",
                                                },
                                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-sortIcon": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-row": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                    borderBottom: theme === "dark" ? "1px solid #ffffff30 !important" : "1px solid #ccc !important",
                                                },
                                                '&, [class^=MuiDataGrid]': { border: 'none' },
                                                "& .MuiTablePagination-root": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-cell": {
                                                    borderBottom: "none",
                                                },
                                                "& .name-column-cell": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-columnHeader": {
                                                    backgroundColor: theme === "dark" ? "#3e4396" : "#fff",
                                                    borderBottom: "red",
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-virtualScroller": {
                                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                                },
                                                "& .MuiDataGrid-footerContainer": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                    borderTop: "none",
                                                    backgroundColor: theme === "dark" ? "#3e4396" : "#fff",
                                                },
                                                "& .MuiCheckbox-root": {
                                                    color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                                                },
                                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                                    color: `#fff !important`,
                                                },
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Box
                                        m="40px 0 0 0"
                                        height="80vh"

                                    >
                                        <DataGrid checkboxSelection rows={rows} columns={columns}
                                            pageSizeOptions={[10, 25, 50]}
                                            sx={{
                                                '.MuiDataGrid-columnSeparator': {
                                                    display: 'none',
                                                },
                                                '&.MuiDataGrid-root': {
                                                    border: 'none',
                                                },
                                                "& .MuiDataGrid-root": {
                                                    border: "none",
                                                    outline: "none",
                                                },
                                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-sortIcon": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-row": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                    borderBottom: theme === "dark" ? "1px solid #ffffff30 !important" : "1px solid #ccc !important",
                                                },
                                                '&, [class^=MuiDataGrid]': { border: 'none' },
                                                "& .MuiTablePagination-root": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-cell": {
                                                    borderBottom: "none",
                                                },
                                                "& .name-column-cell": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-columnHeader": {
                                                    backgroundColor: theme === "dark" ? "#3e4396" : "#fff",
                                                    borderBottom: "red",
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                },
                                                "& .MuiDataGrid-virtualScroller": {
                                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                                },
                                                "& .MuiDataGrid-footerContainer": {
                                                    color: theme === "dark" ? "#fff" : "#000",
                                                    borderTop: "none",
                                                    backgroundColor: theme === "dark" ? "#3e4396" : "#fff",
                                                },
                                                "& .MuiCheckbox-root": {
                                                    color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                                                },
                                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                                    color: `#fff !important`,
                                                },
                                            }}
                                        />
                                    </Box>
                                )
                        }
                    </Box>


                )


            }

            {active && (

                <div className='w-[500px] h-[44vh] dark:bg-[#111c43d7] bg-white shadow-xl items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-3 rounded-md'>

                    <h1 className={`${styles.title}`}>
                        Add New Member
                    </h1>

                    <form action="" onSubmit={handleSubmit}>
                        <label className={`${styles.label}`} htmlFor="email">
                            Enter your email
                        </label>

                        <input
                            name='email'
                            type='text'
                            value={values.email}
                            onChange={handleChange}
                            id='email'
                            placeholder='Enter your email'
                            className={`${styles.input} pl-3`}
                        />

                        <div className='mt-3'>
                            <label className={`${styles.label} `} htmlFor="email">
                                Select role
                            </label>

                            <select id="role" name="role" value={values.role} onChange={handleChange} className={`${styles.input}`}>
                                <option className='text-white dark:text-black'>Select role</option>
                                <option value="admin" className='text-white dark:text-black'>admin</option>
                                <option value="user" className='text-white dark:text-black'>user</option>
                            </select>
                        </div>

                        <div className=' flex justify-center'>
                            <input
                                name='password'
                                type='submit'
                                id='password'
                                placeholder='Enter your password'
                                className={`${styles.button}  !w-[180px] mt-5 bg-[#3e4396] `}
                            />
                        </div>
                    </form>



                </div>

            )
            }

        </div >

    )
}

export default AllUsers