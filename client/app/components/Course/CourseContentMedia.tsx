import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import avatarDefault from '../../../public/img/avatar.jpg'
import toast from 'react-hot-toast'
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddNewReviewMutation, useAddReplyReviewMutation, useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import CommentReply from './CommentReply'
import Ratings from '@/app/utils/Ratings'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'

import socketIO from 'socket.io-client'

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

type Props = {

    data: any
    id: string
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void
    user: any
    refetch: any

}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {

    const [activeBar, setActiveBar] = useState(0)

    const [question, setQuestion] = useState("")

    const [answer, setAnswer] = useState("")

    const [questionId, setQuestionId] = useState("")

    const [isReviewReply, setIsReviewReply] = useState(false)

    const [reply, setReply] = useState("")

    const [review, setReview] = useState("")

    const [rating, setRating] = useState(1)

    const [reviewId, setReviewId] = useState('')

    const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation()

    const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true })

    const course = courseData?.course

    const [addAnswerInQuestion, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] = useAddAnswerInQuestionMutation()

    const [addNewReview, { isSuccess: successReview, error: errorReview, isLoading: reviewCreationLoading }] = useAddNewReviewMutation()

    const [addReplyReview, { isSuccess: replyReviewSuccess, error: replyReviewError, isLoading: replyReviewCreationLoading }] = useAddReplyReviewMutation()

    const handleQuestion = () => {

        if (question.length === 0) {

            toast.error("Question cannot be empty")

        } else {

            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id })

        }

    }

    useEffect(() => {

        if (isSuccess) {

            setQuestion("")
            refetch()
            toast.success("Question added successfully")
            socketId.emit("notification", {

                title: "New Question Received",
                message: `You have a new question in ${data[activeVideo].title}`,
                userId: user._id

            })

        }

        if (error) {

            if ("data" in error) {

                const errorData = error as any
                toast.error(errorData.data.message)

            }

        }



    }, [isSuccess, error])

    useEffect(() => {

        if (answerSuccess) {

            setAnswer("")
            refetch()
            toast.success("Answer added successfully")
            if (user.role !== 'admin') {

                socketId.emit("notification", {

                    title: "New Question Reply Receiced",
                    message: `You have a new question reply in ${data[activeVideo].title}`,
                    userId: user._id

                })

            }

        }

        if (answerError) {

            if ("data" in answerError) {

                const errorData = answerError as any
                toast.error(errorData.data.message)

            }

        }

    }, [answerSuccess, answerError])

    useEffect(() => {

        if (successReview) {

            setReview("")
            courseRefetch()
            toast.success("Review added successfully")
            socketId.emit("notification", {

                title: "New Review Recieved",
                message: `${user?.name} has given a review in ${course?.name}`,
                userId: user._id

            })

        }

        if (errorReview) {

            if ("data" in errorReview) {

                const errorData = errorReview as any
                toast.error(errorData.data.message)

            }

        }

    }, [successReview, errorReview])

    useEffect(() => {

        if (replyReviewSuccess) {

            setReply("")
            courseRefetch()
            toast.success("Reply added successfully")

        }

        if (replyReviewError) {

            if ("data" in replyReviewError) {

                const errorData = replyReviewError as any
                toast.error(errorData.data.message)

            }

        }

    }, [replyReviewSuccess, replyReviewError])

    const isReviewExists = course?.reviews?.find((item: any) => item.user._id === user._id)

    const handleAnswerSubmit = () => {

        addAnswerInQuestion({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: questionId })

    }

    const handleReviewSubmit = async () => {

        if (review.length === 0) {

            toast.error("Review cannot be empty!")

        } else {

            addNewReview({ review, rating, courseId: id })

        }

    }

    const handleReviewReplySubmit = () => {

        if (!replyReviewCreationLoading) {

            if (reply === '') {

                toast.error("Reply review cannot be empty")

            } else {

                addReplyReview({ comment: reply, courseId: id, reviewId })

            }

        }

    }

    return (

        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>

            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />

            <div className='w-full flex items-center justify-between my-3'>

                <div
                    className={`${styles.button} !min-h-[40px] !w-[unset] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >

                    <AiOutlineArrowLeft className='mr-2' />
                    Prev Lesson

                </div>

                <div
                    className={`${styles.button} !min-h-[40px] !w-[unset]  !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >

                    Next Lesson
                    <AiOutlineArrowRight className='ml-2' />

                </div>

            </div>

            <h1 className='pt-2 text-[22px] font-[600] text-black dark:text-white'>
                {data[activeVideo]?.title}
            </h1>

            <br />

            <div className='w-full p-4 flex items-center justify-between dark:bg-slate-500 dark:bg-opacity-20 bg-slate-500 bg-opacity-10 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>

                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (

                    <h5
                        className={`800px:text-[18px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>

                ))}

            </div>

            <br />

            {activeBar === 0 && (

                <>
                    <p className='text-[18px] whitespace-pre-line mb-3 text-black dark:text-white'>
                        {data[activeVideo]?.description}
                    </p>
                    <br />
                </>


            )}

            {activeBar == 1 && (

                <div className=''>

                    {data[activeVideo]?.links.map((item: any, index: number) => (

                        <div className='mb-5' key={index}>

                            <h2 className='800px:text-[20px] 800px:inline-block text-black dark:text-white'>
                                {item.title && item.title + " :"}
                            </h2>

                            <a href={item.url} className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'>
                                {item.url}
                            </a>

                        </div>

                    ))}

                    <br />
                </div>

            )}

            {activeBar === 2 && (

                <>

                    <div className='flex w-full'>

                        <Image
                            src={user.avatar ? user.avatar.url : avatarDefault}
                            width={40}
                            height={40}
                            alt=''
                            className='rounded-full h-[40px] w-[40px] object-cover'
                        />

                        <textarea
                            cols={40}
                            rows={4}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder='Write your question...'
                            className='outline-none bg-transparent  text-black dark:text-white ml-3 border  dark:border-[#ffffff57]  800px:w-full p-2 rounded w-[90%] 800px:text-[16px] font-Poppins'
                        >

                        </textarea>

                    </div>

                    <div className='w-full flex justify-end'>

                        <div
                            className={`${styles.button} !h-[40px] !w-[120px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'}`}
                            onClick={questionCreationLoading ? () => { } : handleQuestion}
                        >
                            Submit
                        </div>

                    </div>

                    <br />
                    <br />

                    <div className='w-full h-[1px] bg-[#ffffff3b]'>

                    </div>

                    <div>
                        <CommentReply
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            user={user}
                            handleAnswerSubmit={handleAnswerSubmit}
                            setQuestionId={setQuestionId}
                            answerCreationLoading={answerCreationLoading}
                        />
                    </div>

                </>

            )}

            {activeBar === 3 && (

                <div className='w-full'>

                    {!isReviewExists && (

                        <>
                            <div className='w-full flex'>
                                <Image
                                    src={user.avatar ? user.avatar.url : avatarDefault}
                                    width={40}
                                    height={40}
                                    alt=''
                                    className='rounded-full h-[40px] w-[40px] object-cover'
                                />

                                <div className="w-full">
                                    <h5 className='pl-3 text-[18px] font-[500] text-black dark:text-white'>

                                        Give a rating <span className='text-red-500'>*</span>

                                    </h5>

                                    <div className='flex w-full ml-2 pb-3'>

                                        {[1, 2, 3, 4, 5].map((i) => rating >= i ?
                                            (<AiFillStar
                                                key={i}
                                                className='mr-1 cursor-pointer'
                                                color='rgb(246,186,0)'
                                                size={25}
                                                onClick={() => setRating(i)}
                                            />)
                                            :
                                            (
                                                <AiOutlineStar
                                                    key={i}
                                                    className='mr-1 cursor-pointer'
                                                    color='rgb(246,186,0)'
                                                    size={25}
                                                    onClick={() => setRating(i)}
                                                />
                                            )
                                        )}

                                    </div>

                                    <textarea
                                        cols={40}
                                        rows={4}
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder='Write your review...'
                                        className='outline-none bg-transparent  text-black dark:text-white ml-3 border dark:border-[#ffffff57]  800px:w-full p-2 rounded w-[90%] 800px:text-[16px] font-Poppins'
                                    >

                                    </textarea>

                                </div>

                            </div>

                            <div className='w-full ml-3 flex justify-end'>

                                <div className={`${styles.button} !h-[40px] !w-[120px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewCreationLoading && 'cursor-not-allowed'}`} onClick={reviewCreationLoading ? () => { } : handleReviewSubmit} >
                                    Submit
                                </div>

                            </div>
                        </>
                    )}

                    <br />

                    <div className='w-full h-[1px] ml-3 bg-[#ffffff3b]'></div>
                    <>
                        <div className="w-full">

                            {(course?.reviews && [...course.reviews].reverse().map((item: any, index: number) => (

                                <div className='w-full my-5' key={index}>

                                    <div className="w-full flex">

                                        <div>
                                            <Image
                                                src={item.user.avatar ? item.user.avatar.url : avatarDefault}
                                                width={40}
                                                height={40}
                                                alt=''
                                                className='w-[40px] h-[40px] rounded-full object-cover'
                                            />
                                        </div>

                                        <div className='ml-2'>

                                            <h1 className='text-[18px] text-black dark:text-white'>
                                                {item?.user.name}
                                            </h1>
                                            <Ratings rating={item.rating} />
                                            <p className='text-black dark:text-white'>
                                                {item.comment}
                                            </p>

                                            <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                {format(item.createdAt)} ·
                                            </small>

                                        </div>

                                    </div>

                                    {user.role === 'admin' && (

                                        <span
                                            className={` text-black dark:text-[#ffffff83] !ml-12 cursor-pointer`}
                                            onClick={() => { setIsReviewReply(true), setReviewId(item._id) }}
                                        > Reply
                                        </span>
                                    )}
                                    <br />

                                    {isReviewReply && (
                                        <div className='w-full flex relative'>

                                            <input
                                                type="text" className={`${styles.input} !border-[0px] ml-[3%] w-[90%] rounded-none !border-b mt-[-10px]`}
                                                placeholder='Enter your reply...'
                                                value={reply}
                                                onChange={(e: any) => setReply(e.target.value)}
                                            />

                                            <button
                                                type='submit'
                                                className='absolute right-0 bottom-1 text-black dark:text-white'
                                                onClick={handleReviewReplySubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>

                                    )}

                                    {item.commentReplies.map((i: any, index: number) => (

                                        <div className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'>

                                            <div>
                                                <Image
                                                    src={i.user.avatar ? i.user.avatar.url : avatarDefault}
                                                    width={40}
                                                    height={40}
                                                    alt=''
                                                    className='w-[40px] h-[40px] rounded-full object-cover'
                                                />
                                            </div>

                                            <div className='pl-3'>

                                                <div className="flex items-center">
                                                    <h5 className='text-[18px] text-black dark:text-white'>
                                                        {i?.user.name}
                                                    </h5>

                                                    {i.user.role === 'admin' ? (<VscVerifiedFilled className='text-[#0095f6] ml-1 text-[20px]' />) : ""}
                                                </div>

                                                <p className='text-black dark:text-white'>
                                                    {i?.comment}
                                                </p>

                                                <small className='text-[#0000008a] dark:text-[#ffffff83]'>
                                                    {format(i?.createdAt)} ●
                                                </small>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )))}

                        </div>
                    </>
                </div>

            )}

        </div >

    )

}

export default CourseContentMedia