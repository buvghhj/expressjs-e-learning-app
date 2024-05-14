import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '../../../app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer'
import CourseDetail from './CourseDetail'
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '@/redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'

type Props = {

    id: string

}

const CourseDetailPage: FC<Props> = ({ id }: Props) => {

    const [open, setOpen] = useState(false)

    const [route, setRoute] = useState('Login')

    const { data, isLoading } = useGetCourseDetailsQuery(id)

    const { data: config } = useGetStripePublishablekeyQuery({})

    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation()

    const [stripePromise, setStripePromise] = useState<any>(null)

    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {

        if (config) {

            const publishablekey = config?.publishablekey

            setStripePromise(loadStripe(publishablekey))

        }

        if (data) {

            const amount = Math.round(data.course.price * 100)
            createPaymentIntent(amount)

        }

    }, [config, data])

    useEffect(() => {

        if (paymentIntentData) {

            setClientSecret(paymentIntentData?.client_secret)

        }

    }, [paymentIntentData])



    return (

        <>
            {isLoading ? (<Loader />) : (

                <div>
                    <Heading
                        title={data?.course.name + " - BHcodemy"}
                        description="BHcodemy is a platform for student to learn and get help from teachers"
                        keywords={data?.course?.tags}
                    />
                    <Header
                        open={open}
                        setOpen={setOpen}
                        setRoute={setRoute}
                        route={route}
                        activeItem={1}
                    />


                    <div className="hero_animation">

                        {
                            stripePromise && (

                                <CourseDetail
                                    data={data.course}
                                    stripePromise={stripePromise}
                                    clientSecret={clientSecret}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                />

                            )
                        }

                        <Footer />

                    </div>
                </div>

            )}
        </>

    )

}

export default CourseDetailPage