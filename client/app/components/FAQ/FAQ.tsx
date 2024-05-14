import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

type Props = {}

const FAQ = (props: Props) => {

    const { data, isLoading } = useGetHeroDataQuery("FAQ")

    const [activeQuestion, setActiveQuestion] = useState(null)
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {

        if (data) {

            setQuestions(data.layout.faq)

        }

    }, [data])

    const toggleQuestion = (id: any) => {

        setActiveQuestion(activeQuestion === id ? null : id)

    }

    return (

        <div>

            <div className='w-[80%] 800px:w-[70%] m-auto mt-[120px]'>

                <h1 className={`${styles.title} 800px:text-[40px]`}>
                    Frequently Asked Questions
                </h1>

                <div className='mt-12'>

                    <dl className='space-y-8'>

                        {questions.map((q: any) => (

                            <div key={q._id} className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6 `}>

                                <dt className='text-lg'>

                                    <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none' onClick={() => toggleQuestion(q._id)}>

                                        <span className='font-medium dark:text-white text-black '>
                                            {q.question}
                                        </span>

                                        <span className='ml-6 flex-shrink-0'>

                                            {activeQuestion === q._id ? (<HiMinus className='h-6 w-6' />) : (<HiPlus className='h-6 w-6' />)}

                                        </span>

                                    </button>

                                    {activeQuestion === q._id && (
                                        <dd className='!mt-8 pr-12'>

                                            <p className='text-base !font-Poppins text-black dark:text-white'>
                                                {q.answer}
                                            </p>

                                        </dd>
                                    )}

                                </dt>

                            </div>

                        ))}

                    </dl>

                </div>

                <br />
                <br />
                <br />

            </div>

        </div>

    )

}

export default FAQ