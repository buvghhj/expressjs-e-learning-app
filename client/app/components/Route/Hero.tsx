import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Loader from '../Loader/Loader'
import { useRouter } from 'next/navigation'

type Props = {}

const Hero: FC<Props> = (props) => {

    const { data, refetch, isLoading } = useGetHeroDataQuery('Banner', {})

    const [search, setSearch] = useState('')

    const router = useRouter()

    const handleSearch = () => {

        if (search === "") {
            return
        } else {

            router.push(`/courses?title=${search}`)

        }

    }

    return (

        <>
            {isLoading ? (<Loader />) : (

                <section className="bg-black-900 text-white ">

                    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">

                        <div className="w-full h-auto max-w-full block">

                            <img src={data?.layout?.banner.image?.url} alt="" className="hidden 800px:block rounded object-cover mx-auto w-[82%] " />

                        </div>

                        <div className="mx-auto max-w-3xl text-center">

                            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  font-[700]  text-transparent sm:text-5xl font-Poppins text-[30px] " style={{ marginBottom: "25px" }}>
                                {data?.layout?.banner.title}
                            </h1>

                            <p className="mx-auto mt-4 max-w-xl font-[600] text-[15px] font-Poppins text-black dark:text-white" style={{ marginBottom: "50px" }} >
                                {data?.layout?.banner.subTitle}
                            </p>



                            <div className="mt-8 flex flex-wrap justify-center gap-4 w-full">


                                <div className='1500px:w-[85%] 1100px:w-[88%] w-[100%] h-[50px] bg-transparent relative gap-4'>
                                    <input
                                        type="search"
                                        placeholder='Search Courses...'
                                        className='1500px:w-[80%] 1100px:w-[80%] bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#fff] text-[#000] text-[20px] font-[500] font-Josefin'
                                        value={search}
                                        onChange={(e: any) => setSearch(e.target.value)}
                                    />

                                    <div className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 hero_animation_2 rounded-r-[5px]' onClick={handleSearch}>
                                        <BiSearch className='text-white' size={30} />
                                    </div>
                                </div>


                                <div className='1500px:w-[65%] 1100px:w-[88%] w-[100%] flex items-center'>

                                    <img src='https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100257.jpg?t=st=1710474949~exp=1710478549~hmac=acd39d069e5579ebb3a3dbf6267bbac80b3c9c4c26a463558b1a5f1153dbad27&w=740' alt='' className='rounded-full  w-[8%]  dark:border-white border-2 border-gray ' />

                                    <img src='https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?t=st=1710475481~exp=1710479081~hmac=3cca1d6b73a246fc75d958dc13b5b20fde67a70462a328b5b095f67b4c066ff5&w=740' alt='' className='rounded-full ml-[-15px] w-[8%]  dark:border-white border-2 border-gray ' />

                                    <img src='https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1710475515~exp=1710479115~hmac=6e89ac5da5d5d37038255ac02327c58086843bed9231794758d360fbf944e6af&w=740' alt='' className='rounded-full ml-[-15px] w-[8%]  dark:border-white border-2 border-gray ' />

                                    <img src='https://img.freepik.com/free-photo/3d-illustration-cartoon-character-hoodie-cap_1142-48674.jpg?t=st=1710476030~exp=1710479630~hmac=dc978e5fb0758299411a77983d6fc2092ced000c92a764008d2f9bab412bc57b&w=740' alt='' className='rounded-full ml-[-15px] w-[8%]  dark:border-white border-2 border-gray ' />

                                    <img src='https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100271.jpg?t=st=1710476071~exp=1710479671~hmac=e3daf20bbafdda0f69236cb389a166078c24bdfa2eaa41f871aa6f81f2a23ae4&w=740' alt='' className='rounded-full ml-[-15px] w-[8%]  dark:border-white border-2 border-gray ' />

                                    <p className='font-Josefin dark:text-[#edfff4]  text-[15px]  text-[#000000b3] 1000px:pl-3  font-[600]'>
                                        500k+ People already trusted us. {""}
                                        <Link href='courses' className='dark:text-[#46e256] text-[15px] text-[#46e256] '>View Courses</Link>
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}

        </>

    )

}

export default Hero