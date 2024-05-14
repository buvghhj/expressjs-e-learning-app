'use client'
import React from 'react'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import Heading from '../../../app/utils/Heading'
import DashboardHeader from '../../../app/components/Admin/DashboardHeader'
import CreateCourse from '../../../app/components/Admin/course/CreateCourse'

type Props = {}

const page = (props: Props) => {

    return (

        <div>
            <Heading
                title="BHcodemy - Admin"
                description="BHcodemy is a platform for student to learn and get help from teachers"
                keywords="Programing, AI, devOps, Machine Learning"
            />

            <div className="flex">

                <div className="1500px:w-[16%] w-1/5">

                    <AdminSidebar />

                </div>

                <div className='w-[85%]'>

                    <DashboardHeader />

                    <CreateCourse />

                </div>

            </div>
        </div>

    )

}

export default page