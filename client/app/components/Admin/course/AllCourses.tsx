import React, { FC } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Box, Button } from '@mui/material'
import { useTheme } from 'next-themes'
import { FiEdit2 } from 'react-icons/fi'
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
import Link from 'next/link'

type Props = {}

const AllCourses: FC<Props> = () => {

    const { isLoading, data, error } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })

    const { theme, setTheme } = useTheme()

    const columns = [

        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Course Name", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.3 },
        { field: "price", headerName: "Price", flex: 0.3 },
        { field: "purchased", headerName: "Purchased", flex: 0.3 },
        { field: "createdAt", headerName: "Created At", flex: 0.3 },
        {
            field: "",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {

                return (

                    <>

                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <FiEdit2 className='dark:text-white text-black mt-4 ml-3' size={20} />
                        </Link>

                    </>

                )

            }
        },

    ]

    const rows: any[] = []

    {
        data && data.courses.forEach((item: any) => {

            rows.push({
                id: item._id,
                name: item.name,
                ratings: item.ratings,
                price: item.price,
                purchased: item.purchased,
                createdAt: format(item.createdAt)
            })

        });
    }

    return (

        <div className='mt-[120px] ml-6'>

            {isLoading
                ?
                (
                    <Loader />
                )
                :
                (
                    <Box m="20px">
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
                    </Box>
                )
            }

        </div>

    )
}

export default AllCourses