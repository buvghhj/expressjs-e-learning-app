import Link from 'next/link'
import React from 'react'
import { FaGithub, FaInstagramSquare, FaPhoneVolume, FaYoutube } from "react-icons/fa";
import { IoLocation } from 'react-icons/io5';
import { RiMailSendLine } from 'react-icons/ri';

type Props = {}

const Footer = (props: Props) => {

    return (

        <footer>

            <div className='border border-[#0000000e] dark:border-[#ffffff1e]'>

                <br />

                <div className='w-[95%] 800px-w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>

                    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>

                        <div className='space-y-3'>

                            <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                                About
                            </h3>

                            <ul className='space-y-4'>

                                <li>
                                    <Link href="/about" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        Our Story
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/privacy-policy" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/faq" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        FAQ
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className='space-y-3'>
                            <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                                Quick Links
                            </h3>

                            <ul className='space-y-4'>

                                <li>
                                    <Link href="/courses" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        Courses
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/profile" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        My Account
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/course-dashboard" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        Course Dashboard
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className='space-y-3'>
                            <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                                Socials Links
                            </h3>

                            <ul className='space-y-4'>

                                <li>
                                    <Link href="/#" className='flex items-center gap-2  text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        <FaYoutube /> Youtube
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/$" className=' flex items-center gap-2 text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        <FaInstagramSquare />
                                        Instagram
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/#" className='flex items-center gap-2  text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        <FaGithub />
                                        Github
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className=''>

                            <h3 className='text-[20px] font-[600] text-black dark:text-white pb-3'>
                                Contact Info
                            </h3>

                            <p className='flex items-center gap-2 text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                                <FaPhoneVolume /> 0367253072
                            </p>

                            <p className='flex items-center gap-2  text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                                <IoLocation /> 79 Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi
                            </p>

                            <p className='flex items-center gap-2  text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                                <RiMailSendLine />
                                buvghhj123@gmail.com
                            </p>

                        </div>

                    </div>

                    <br />

                    <p className='text-center text-black dark:text-white'>
                        Copyright © 2024 BHcodemy | All Rights Reserved
                    </p>

                </div>
                <br />
            </div>

        </footer>

    )

}

export default Footer