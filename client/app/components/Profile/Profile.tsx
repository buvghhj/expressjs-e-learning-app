'use client'
import React, { FC, useEffect, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from '../../../redux/features/auth/authApi'
import { signOut, useSession } from 'next-auth/react'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import CourseCard from '../Course/CourseCard'
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi'

type Props = {

    user: any

}

const Profile: FC<Props> = ({ user }) => {

    const [scroll, setScroll] = useState(false)

    const [avatar, setAvatar] = useState(null)

    const [courses, setCourses] = useState([])

    const [active, setActive] = useState(1)

    const [logout, setLogout] = useState(false)

    const { data } = useSession()

    const { } = useLogoutQuery(undefined, { skip: !logout ? true : false })

    const { data: dataCourses, isLoading } = useGetUserAllCoursesQuery(undefined, {})

    const logoutHandler = async (e: any) => {

        setLogout(true)

        await signOut()

    }

    // useEffect(() => {

    //     if (data === null) {

    //         setLogout(true)

    //     }

    // }, [data])


    if (typeof window !== 'undefined') {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 85) {

                setScroll(true)

            } else {

                setScroll(false)

            }

        })

    }

    useEffect(() => {

        if (dataCourses) {

            const filteredCourses = user.courses.map((userCourse: any) => dataCourses.courses.find((course: any) => course._id === userCourse._id)).filter((course: any) => course !== undefined)

            setCourses(filteredCourses)

        }

    }, [dataCourses])


    return (

        <div className='w-[85%] flex mx-auto'>

            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014]  rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? 'top-[120px]' : 'top-[30px]'} left-[30px]`}>

                <SidebarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />

            </div>

            {active === 1 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ProfileInfo avatar={avatar} user={user} />
                </div>
            )}

            {active === 2 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ChangePassword />
                </div>
            )}

            {active === 3 && (
                <div className='w-full pl-7 px-2 800px:px-10 800px:pl-8'>

                    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] xl:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-3 1500px:gap-[66px] md-12 !mt-20 border-0'>
                        {courses && courses.map((item: any, index: number) => (
                            <CourseCard
                                item={item}
                                key={index}
                                user={user}
                                isProfile={true}
                            />
                        ))}

                    </div>

                    {courses.length === 0 && (

                        <h1 className='text-center text-black dark:text-white text-[18px] font-Poppins'>You don't have any purchased courses!</h1>
                    )}
                </div>
            )}

        </div>

    )

}

export default Profile