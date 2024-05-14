'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from '../../components/Admin/DashboardHero'
import UsersAnalytics from '../../components/Admin/Analytics/UsersAnalytics'

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
                <div className="flex">

                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>

                    <div className='w-[85%]'>

                        <DashboardHero />

                        <UsersAnalytics />

                    </div>

                </div>
            </AdminProtected>
        </div>

    )
}

export default page