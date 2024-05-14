import React from 'react'
import CommentItem from './CommentItem'

type Props = {

    data: any
    activeVideo: number
    answer: string
    setAnswer: any
    user: any
    handleAnswerSubmit: any
    setQuestionId: any
    answerCreationLoading: any

}

const CommentReply = ({ data, activeVideo, answer, setAnswer, user, handleAnswerSubmit, setQuestionId, answerCreationLoading }: Props) => {

    return (

        <div className='w-full my-3'>

            {data[activeVideo]?.questions.map((item: any, index: number) => (

                <CommentItem
                    key={index}
                    data={data}
                    activeVideo={activeVideo}
                    item={item}
                    index={index}
                    answer={answer}
                    setAnswer={setAnswer}
                    setQuestionId={setQuestionId}
                    handleAnswerSubmit={handleAnswerSubmit}
                    answerCreationLoading={answerCreationLoading}
                />

            ))}

        </div>

    )

}

export default CommentReply