import { useGetCoursesAnalyticsQuery, useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'


type Props = {
    isDashboard?: boolean;
}

const OrdersAnalytics = ({ isDashboard }: Props) => {

    const { data, isLoading } = useGetOrdersAnalyticsQuery({})

    const analyticsData: any = []

    data && data.orders.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, uv: item.count })
    })

    const minValue = 0

    return (
        <>

            {isLoading ? (<Loader />) : (
                <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
                    <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}>
                        <h1
                            className={`${styles.title} ${isDashboard && "!text-[20px]"
                                } px-5 !text-center`}
                        >
                            Orders Analytics
                        </h1>
                        {!isDashboard && (
                            <p className={`${styles.label} px-5 text-center`}>
                                Last 12 months analytics data{" "}
                            </p>
                        )}
                    </div>
                    <div
                        className={`w-full ${!isDashboard ? "h-[80%]" : "h-full"
                            } flex items-center justify-center`}
                    >
                        <ResponsiveContainer
                            width={"90%"}
                            height={"90%"}
                        >
                            <LineChart
                                width={500}
                                height={300}
                                data={analyticsData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name">
                                    <Label
                                        offset={0}
                                        position="insideBottom"
                                    />
                                </XAxis>
                                <YAxis>
                                    <Label
                                        angle={-90}
                                        position="insideLeft"
                                        style={{ textAnchor: 'middle' }}
                                    />
                                </YAxis>
                                <Tooltip />
                                {!isDashboard && <Legend />}
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            )}

        </>

    )

}

export default OrdersAnalytics