import React, { FC, useEffect, useState } from 'react'
import UsersAnalytics from '../Analytics/UsersAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from 'react-icons/pi'
import OrdersAnalytics from '../Analytics/OrdersAnalytics';
import AllInvoices from '../Orders/AllInvoices';
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

type Props = {
    open?: boolean
    value?: number
}

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {

    return (

        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />

            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></Box>

        </Box>

    )
};

const DashboardWidgets: FC<Props> = ({ open }) => {

    const [orderComparePercentange, setOrderComparePercentange] = useState<any>()

    const [userComparePercentange, setUserComparePercentange] = useState<any>()

    const { data, isLoading } = useGetUsersAnalyticsQuery({})

    const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({})

    useEffect(() => {

        if (isLoading && ordersLoading) {

            return

        } else {

            if (data && ordersData) {

                const usersLastTwoMonths = data.users.last12Months.slice(-2)

                const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2)

                if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {

                    const usersCurrentMonth = usersLastTwoMonths[1].count
                    const usersPreviusMonth = usersLastTwoMonths[0].count

                    const ordersCurrentMonth = ordersLastTwoMonths[1].count
                    const ordersPreviusMonth = ordersLastTwoMonths[0].count

                    const usersPercentChange = usersPreviusMonth !== 0 ? ((usersCurrentMonth - usersPreviusMonth) / usersPreviusMonth) * 100 : 100
                    const ordersPercentChange = ordersPreviusMonth !== 0 ? ((ordersCurrentMonth - ordersPreviusMonth) / ordersPreviusMonth) * 100 : 100

                    setUserComparePercentange({

                        currentMonth: usersCurrentMonth,
                        previusMonth: usersPreviusMonth,
                        percentChange: usersPercentChange

                    })

                    setOrderComparePercentange({

                        currentMonth: ordersCurrentMonth,
                        previusMonth: ordersPreviusMonth,
                        percentChange: ordersPercentChange

                    })

                }

            }

        }

    }, [isLoading, ordersLoading, data, ordersData])

    return (

        <div className='mt-[10px]'>

            <div className='grid grid-cols-[75%,25%]'>

                <div className='p-8'>

                    <UsersAnalytics isDashboard={true} />

                </div>

                <div className='pt-[80px] pr-8'>

                    <div className='w-full dark:bg-[#1b21378a] rounded-md shadow'>

                        <div className='flex items-center p-5 justify-between'>

                            <div className=''>

                                <BiBorderLeft className=' dark:text-[#45CBA0] text-black text-[30px]' />

                                <h5 className='pt-2 font-Poppins dark:text-white text-black text-[20px]'>

                                    {orderComparePercentange?.currentMonth}

                                </h5>


                                <h5 className='pt-2 font-Poppins dark:text-white text-black text-[20px] font-[400]'>

                                    Sales Obtained

                                </h5>

                            </div>

                            <div className=''>

                                <CircularProgressWithLabel value={orderComparePercentange?.percentChange > 0 ? 100 : 0} open={open} />
                                <h5 className='text-center pt-4 dark:text-white text-black'> {orderComparePercentange?.percentChange > 0 ? "+" + orderComparePercentange?.percentChange.toFixed(2) : "-" + orderComparePercentange?.percentChange.toFixed(2)}%</h5>

                            </div>

                        </div>

                    </div>

                    <div className='w-full dark:bg-[#1b21378a] rounded-md shadow my-8'>

                        <div className='flex items-center p-5 justify-between'>

                            <div className=''>

                                <PiUsersFourLight className='dark:text-[#45CBA0] text-black text-[30px]' />

                                <h5 className='pt-2 font-Poppins dark:text-white text-black text-[20px]'>

                                    {userComparePercentange?.currentMonth}

                                </h5>

                                <h5 className='pt-2 font-Poppins dark:text-white text-black text-[20px] font-[400]'>

                                    New Users

                                </h5>

                            </div>

                            <div className=''>

                                <CircularProgressWithLabel value={userComparePercentange?.percentChange > 0 ? 100 : 0} open={open} />
                                <h5 className='text-center pt-4 dark:text-white text-black'>
                                    {userComparePercentange?.percentChange > 0 ? "+" + userComparePercentange?.percentChange.toFixed(2) : "-" + userComparePercentange?.percentChange.toFixed(2)}%
                                </h5>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-[55%,25%] mt-[-50px]">

                <div className="bg-[#1b21378a] w-[100%] mt-[30px] !ml-12 h-[40vh] shadow-md rounded-md m-auto">

                    <OrdersAnalytics isDashboard={true} />

                </div>
                <div className="p-3" style={{ marginLeft: "60px" }}>
                    <h5 className="text-[#fff] ml-16 mt-4 text-[16px] font-[400] font-Poppins pb-3">
                        Recent Transactions
                    </h5>
                    <AllInvoices isDashboard={true} />
                </div>
            </div>

            <br />

        </div>

    )

}

export default DashboardWidgets