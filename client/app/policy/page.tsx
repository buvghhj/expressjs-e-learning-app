'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Policy from './Policy'

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false)

    const [activeItem, setActiveItem] = useState(0)

    const [route, setRoute] = useState('Login')


    return (

        <div>

            <Heading
                title="Policy - BHcodemy"
                description="BHcodemy is a platform for student to learn and get help from teachers"
                keywords="Programing, AI, devOps, Machine Learning"
            />

            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <div className="hero_animation">

                <Policy />

                <Footer />

            </div>

        </div>

    )
}

export default page