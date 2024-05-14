'use client'
import AllCourses from '../../../app/components/Admin/course/AllCourses'
import DashboardHero from '../../../app/components/Admin/DashboardHero'
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {

    return (

        <div>
            <AdminProtected>
                <Heading
                    title="BHcodemy - Admin"
                    description="BHcodemy is a platform for student to learn and get help from teachers"
                    keywords="Programing, AI, devOps, Machine Learning"
                />
                <div className="flex h-screen">

                    <div className="1500px:w-[16%] w-1/5" >
                        <AdminSidebar />
                    </div>

                    <div className='w-[85%] relative'>

                        <DashboardHero />

                        <AllCourses />

                    </div>

                </div>
            </AdminProtected>
        </div>

    )

}

export default page