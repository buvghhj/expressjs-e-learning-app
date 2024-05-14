import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { format } from 'timeago.js'
import Loader from '../../Loader/Loader'
import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

type Props = {

    isDashboard?: boolean

}

const AllInvoices: FC<Props> = ({ isDashboard }) => {

    const { theme, setTheme } = useTheme()

    const { isLoading, data } = useGetAllOrdersQuery({})
    const { data: usersData } = useGetAllUsersQuery({})
    const { data: coursesData } = useGetAllCoursesQuery({})

    const [orderData, setOrderData] = useState<any>([])

    useEffect(() => {

        if (data) {

            const temp = data.orders.map((item: any) => {

                const user = usersData?.users.find((user: any) => user._id === item.userId)

                const course = coursesData?.courses.find((course: any) => course._id === item.courseId)

                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price
                }

            })

            setOrderData(temp)

        }

    }, [data, usersData, coursesData])

    const columns: any = [

        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashboard ? .6 : .5 },
        ...(isDashboard
            ? []
            :
            [
                { field: "userEmail", headerName: "Email", flex: 1 },
                { field: "title", headerName: "Course Title", flex: 1 },

            ]
        ),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard
            ?
            [
                { field: "createdAt", headerName: "Created At", flex: 0.5 },

            ]
            :
            [
                {
                    field: "",
                    headerName: "Email",
                    flex: 0.2,
                    renderCell: (params: any) => {

                        return (

                            <>

                                <a href={`mailto:${params.row.userEmail}`}>
                                    <AiOutlineMail className='dark:text-white text-black  mt-4 ml-3' size={20} />
                                </a>

                            </>

                        )

                    }
                }
            ]
        )

    ]

    const rows: any[] = []

    orderData && orderData.forEach((item: any) => {

        rows.push({
            id: item._id,
            userName: item.userName,
            userEmail: item.userEmail,
            title: item.title,
            price: item.price,
            createdAt: format(item.createdAt),
        })

    })

    return (

        <div className={!isDashboard ? 'mt-[130px] ml-8' : 'mt-[-38px]'}>

            {isLoading ? (<Loader />) : (

                <Box m={`${!isDashboard && "40px"}`}>
                    <Box
                        m={`${!isDashboard ? "0" : "40px 0 0 0"}`}
                        height={isDashboard ? "35vh" : "80vh"}
                        width={isDashboard ? "65vh" : "w-full"}
                        overflow={"hidden"}
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
                    >
                        <DataGrid
                            checkboxSelection={isDashboard ? false : true}
                            rows={rows}
                            columns={columns}
                            slots={isDashboard ? {} : { toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>

            )}

        </div>

    )

}

export default AllInvoices