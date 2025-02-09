import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    LabelList,
    Tooltip
} from 'recharts'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'

type Props = {

    isDashboard?: boolean

}

const UsersAnalytics = ({ isDashboard }: Props) => {

    const { data, isLoading } = useGetUsersAnalyticsQuery({})

    const analyticsData: any = []

    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, uv: item.count })
    })

    const minValue = 0

    return (
        <>

            {isLoading ? (<Loader />) : (

                <div
                    className={`${!isDashboard
                        ? "mt-[50px]"
                        : "mt-[50px] h-[324px] bg-[#1b21378a] ml-4 shadow-sm pb-5 rounded-md"
                        }`}
                >
                    <div className={`${isDashboard ? "!ml-7 mb-9" : ""}`}>
                        <h1
                            className={`${styles.title} ${isDashboard && "!text-[20px]"
                                } px-5 !text-center`}
                        >
                            Users Analytics
                        </h1>
                        {!isDashboard && (
                            <p className={`${styles.label} px-5 text-center`}>
                                Last 12 months analytics data{" "}
                            </p>
                        )}
                    </div>

                    <div
                        className={`w-full ${isDashboard ? "h-[30vh]" : "h-screen"
                            } flex items-center justify-center`}
                    >
                        <ResponsiveContainer
                            width={isDashboard ? "100%" : "90%"}
                            height={!isDashboard ? "50%" : "100%"}
                        >
                            <AreaChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#4d62d9"
                                    fill="#4d62d9"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            )}

        </>

    )

}

export default UsersAnalytics