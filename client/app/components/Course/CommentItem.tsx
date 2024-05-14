import Image from 'next/image'
import React, { useState } from 'react'
import { format } from 'timeago.js'
import avatarDefault from '../../../public/img/avatar.jpg'
import { BiMessage } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'

type Props = {

    data: any
    activeVideo: number
    item: any
    index: number
    answer: string
    setAnswer: any
    handleAnswerSubmit: any
    setQuestionId: any
    answerCreationLoading: any

}

const CommentItem = ({ data, activeVideo, item, index, answer, setAnswer, handleAnswerSubmit, setQuestionId, answerCreationLoading }: Props) => {

    const [replyActive, setReplyActive] = useState(false)

    return (

        <>

            <div className='my-4'>

                <div className='flex mb-2'>

                    <div>
                        <Image
                            src={item.user.avatar ? item.user.avatar.url : avatarDefault}
                            width={40}
                            height={40}
                            alt=''
                            className='w-[40px] h-[40px] rounded-full object-cover'
                        />
                    </div>

                    <div className='pl-3'>
                        <div className="flex items-center">
                            <h5 className='text-[18px] text-black dark:text-white'>
                                {item?.user.name}
                            </h5>
                            {item.user.role === 'admin' ? (<VscVerifiedFilled className='text-[#0095f6] ml-1 text-[20px]' />) : ""}
                        </div>

                        <p className='text-black dark:text-white'>
                            {item?.question}
                        </p>

                        <small className='text-[#0000008a] dark:text-[#ffffff83]'>
                            {format(item?.createdAt)} ●
                        </small>

                    </div>

                </div>

                <div className='w-full flex'>

                    <span className='800px:pl-16 text-black text-[16px] dark:text-[#ffffff83] cursor-pointer mr-2' onClick={() => {
                        setReplyActive(!replyActive), setQuestionId(item._id)
                    }} >
                        {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                    </span>

                    <BiMessage size={18} className='!cursor-pointer text-black dark:text-[#ffffff83]' />
                    <span className='pl-1 mt-[-3px] text-[13px]  cursor-pointer text-black dark:text-[#ffffff83]'>
                        {item.questionReplies.length}
                    </span>

                </div>

                {replyActive && (

                    <>
                        {item.questionReplies.map((i: any, index: number) => (

                            <div className='w-full flex 800px:ml-16 my-5 text-black dark:text-white' key={index}>

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
                                        {i?.answer}
                                    </p>

                                    <small className='text-[#0000008a] dark:text-[#ffffff83]'>
                                        {format(i?.createdAt)} ●
                                    </small>

                                </div>

                            </div>

                        ))}

                        <>

                            <div className='w-full flex relative'>

                                <input
                                    type="text"
                                    placeholder='Enter your answer...'
                                    value={answer}
                                    onChange={(e: any) => setAnswer(e.target.value)}
                                    className={`block 800px:ml-12 mt-2 outline-none !bg-transparent border-b text-black dark:text-white border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${answer === "" || answerCreationLoading && 'cursor-not-allowed'}`}
                                />

                                <button
                                    type='submit'
                                    className='absolute right-0 bottom-1 text-black dark:text-white'
                                    onClick={handleAnswerSubmit}
                                    disabled={answer === "" || answerCreationLoading}
                                >
                                    Submit
                                </button>

                            </div>

                        </>

                    </>

                )}

            </div >

        </>

    )

}

export default CommentItem