'use client'
import CourseDetailPage from "@/app/components/Course/CourseDetailPage";
import React, { FC } from "react";

interface Props { }

const Page: FC<Props> = ({ params }: any) => {

    return (

        <div>

            <CourseDetailPage id={params.id} />

        </div>

    )

}

export default Page