import Ratings from '../../../../app/utils/Ratings'
import { styles } from '../../../../app/styles/style'
import CoursePlayer from '../../../../app/utils/CoursePlayer'
import React, { FC } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

type Props = {

    active: number

    setActive: (active: number) => void

    courseData: any

    handleCourseCreate: any

    isEdit?: boolean
}

const CoursePreview: FC<Props> = ({ active, setActive, courseData, handleCourseCreate, isEdit }) => {

    const discountPercentenge = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100

    const discountPercentengePrice = discountPercentenge.toFixed(0)


    const prevButton = () => {

        setActive(active - 1)


    }

    const createCourse = () => {

        handleCourseCreate()

    }

    return (

        <div className='w-[80%] m-auto py-5 mb-5'>

            <div className='w-full relative'>

                <div className='w-full mt-10'>

                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.demoUrl}
                    />

                </div>

                <div className='flex items-center '>

                    <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                        {courseData?.price === 0 ? " Free" : courseData?.price + "$"}
                    </h1>

                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                        {courseData?.estimatedPrice}$
                    </h5>

                    <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">

                        {discountPercentengePrice}% Off

                    </h4>

                </div>

                <div className='flex items-center'>

                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
                        Buy now {courseData?.price} <sup>$</sup>
                    </div>

                </div>

                <div className='flex items-center '>
                    <input
                        type="text"
                        placeholder='Discount code...'
                        className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] !mt-0`}
                    />

                    <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
                        Apply
                    </div>

                </div>

                <br />

                <div className=' items-center '>
                    <p className=' text-black dark:text-white pb-1'>● Source code included</p>
                    <p className=' text-black dark:text-white pb-1'>● Full lifetime access</p>
                    <p className=' text-black dark:text-white pb-1'>● Cetificate of completion</p>
                    <p className=' text-black dark:text-white pb-3 800px:pb-1'>● Premium Support</p>
                </div>

            </div>

            <div className='w-full  mt-3'>

                <div className='w-full 800px:pr-5'>

                    <h1 className='text-[25px] font-Poppins font-[600]  text-black dark:text-white'>

                        {courseData?.name}

                    </h1>

                    <div className='flex items-center pt-3'>

                        <div className='flex items-center'>

                            <Ratings rating={0} />
                            <h5 className=' text-black dark:text-white'>0 Reviews</h5>

                        </div>

                        <h5 className=' text-black dark:text-white ml-3'>
                            0 Students
                        </h5>

                    </div>

                    <br />

                    <h1 className='text-[25px] font-Poppins font-[600]  text-black dark:text-white'>
                        What will you learn from this course?
                    </h1>

                </div>

                {courseData?.benefits?.map((item: any, index: number) => (

                    <div className='w-full flex 800px:items-center py-2' key={index}>

                        <div className='w-[15px] mr-1'>

                            <IoCheckmarkDoneOutline size={20} className=' text-black dark:text-white' />

                        </div>

                        <p className='pl-2  text-black dark:text-white'>
                            {item.title}
                        </p>

                    </div>

                ))}

                <br />
                <h1 className='text-[25px] font-Poppins font-[600]  text-black dark:text-white'>
                    What are the prerequisites for starting this course?
                </h1>

                {courseData?.prerequisites?.map((item: any, index: number) => (

                    <div className='w-full flex 800px:items-center py-2' key={index}>

                        <div className='w-[15px] mr-1'>

                            <IoCheckmarkDoneOutline size={20} className=' text-black dark:text-white' />

                        </div>

                        <p className='pl-2  text-black dark:text-white'>
                            {item.title}
                        </p>

                    </div>

                ))}

                <br />

                <div className='w-full  text-black dark:text-white'>

                    <h1 className='text-[25px] font-Poppins font-[600]  text-black dark:text-white'>
                        Course Details
                    </h1>

                    {courseData?.description}

                </div>

            </div>

            <div className='w-full flex items-center  justify-between'>

                <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' onClick={() => prevButton()}>
                    Prev
                </div>

                <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer ' onClick={() => createCourse()}>
                    {isEdit ? "Update" : "Create"}
                </div>

            </div>

        </div>

    )

}

export default CoursePreview