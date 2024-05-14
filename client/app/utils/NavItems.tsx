import Link from 'next/link'
import React from 'react'

export const navItemsData = [

    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Courses',
        url: '/courses'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Policy',
        url: '/policy'
    },
    {
        name: 'FAQ',
        url: '/faq'
    },

]

type Props = {

    activeItem?: number

    isMobile: boolean

}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {

    return (

        <>

            <div className="hidden 800px:flex">

                {navItemsData && navItemsData.map((item, index) => (
                    <Link href={`${item.url}`} key={index} passHref>
                        <span className={`${activeItem === index ? "dark:text-[bg-gradient-to-r] from-green-300 via-blue-500 to-purple-600 bg-clip-text  text-transparent font-Poppins ] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  text-transparent font-Poppins" : "dark:text-white text-black"} px-6 font-Poppins ]`}>
                            {item.name}
                        </span>
                    </Link>
                ))}

            </div>

            {
                isMobile && (

                    <div className='800px:hidden mt-5'>

                        <div className="w-full text-center py-6">

                            {navItemsData && navItemsData.map((item, index) => (
                                <Link href={`${item.url}`} passHref>

                                    <span className={`${activeItem === index ? "dark:text-[bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  text-transparent font-Poppins]  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  text-transparent font-Poppins " : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                                        {item.name}
                                    </span>
                                </Link>
                            ))}

                        </div>

                    </div>

                )
            }

        </>

    )

}

export default NavItems