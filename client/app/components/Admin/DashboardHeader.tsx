'use client'
import React, { FC, useEffect, useState } from 'react'
import { ThemeSwitcher } from '../../../app/utils/ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'

import socketIO from 'socket.io-client'
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notification/notificationApi'
import { format } from 'timeago.js'

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

type Props = {

    open?: boolean
    setOpen?: any

}

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {

    const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true })

    const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation()

    const [notifications, setNotifications] = useState<any>([])

    const [audio] = useState(new Audio("https://res.cloudinary.com/djis81wm5/video/upload/v1712208059/mixkit-happy-bells-notification-937_dwdttw.wav"))

    const playNotificationSound = () => {

        audio.play()

    }

    useEffect(() => {

        if (data) {

            setNotifications(data.notifications.filter((item: any) => item.status === "unread"))

        }

        if (isSuccess) {

            refetch()

        }

        audio.load()

    }, [data, isSuccess])

    useEffect(() => {

        socketId.on("newNotification", (data) => {

            refetch()
            playNotificationSound()

        })

    }, [])

    const handleNotificationStatusChange = async (id: string) => {

        await updateNotificationStatus(id)

    }

    return (

        <div className='absolute w-full flex items-center justify-end p-6  top-5 right-0 '>

            <ThemeSwitcher />

            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>

                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />

                <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    {notifications && notifications.length}
                </span>

            </div>

            {open && (

                <div className='w-[350px] h-[84vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded'>

                    <h5 className='text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
                        Notifications
                    </h5>

                    {notifications && notifications.slice(0, 4).map((item: any, index: number) => (

                        <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#000000f]' key={index}>

                            <div className='w-full flex items-center justify-between p-2'>

                                <p className='text-black dark:text-white text-[13px]'>
                                    {item.title}
                                </p>

                                <p className='text-black dark:text-white cursor-pointer  text-[13px]'
                                    onClick={() => handleNotificationStatusChange(item._id)}
                                >
                                    Mark as read
                                </p>

                            </div>

                            <p className='px-2 text-black dark:text-white '>
                                {item.message}
                            </p>

                            <p className='p-2 text-black dark:text-white text-[14px]'>
                                {format(item.createdAt)}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    )

}

export default DashboardHeader