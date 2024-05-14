import { AiOutlineCamera } from 'react-icons/ai'
import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'

type Props = {}

const EditHero: FC<Props> = (props: Props) => {

    const [image, setImage] = useState("")

    const [title, setTitle] = useState("")

    const [subTitle, setSubtitle] = useState("")

    const { data, refetch } = useGetHeroDataQuery('Banner', { refetchOnMountOrArgChange: true })

    const [editLayout, { isLoading, isSuccess: successHero, error }] = useEditLayoutMutation()

    useEffect(() => {

        if (data) {

            setTitle(data?.layout?.banner.title)
            setSubtitle(data?.layout?.banner.subTitle)
            setImage(data?.layout?.banner.image?.url)

        }

        if (successHero) {

            refetch()
            toast.success("Hero updated successfully")

        }

        if (error) {

            if ('data' in error) {

                const errorData = error as any
                toast.error(errorData?.data?.message)

            }

        }

    }, [data, successHero, error])

    const handleUpdate = (e: any) => {

        const file = e.target.files?.[0]

        if (file) {

            const reader = new FileReader()
            reader.onload = (e: any) => {

                if (reader.readyState === 2) {

                    setImage(e.target.result as string)

                }

            }

            reader.readAsDataURL(file)

        }

    }

    const handleEdit = async () => {

        await editLayout({ type: "Banner", image, title, subTitle })

    }

    return (

        <>

            <div className='w-full 1000px:flex items-center'>

                <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[500px] 1500px:w-[500px] 1100px:h-[300px] 1100px:w-[300px] h-[30vh] w-[30px] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]'>
                </div>

                <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10'>

                    <div className='relative flex items-center'>

                        <img
                            src={image}
                            alt=""
                            className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] ml-[118px] h-[auto] z-[10]'
                        />

                        <input
                            type="file"
                            name=""
                            id='banner'
                            accept='image/*'
                            onChange={handleUpdate}
                            className='hidden '

                        />

                        <label htmlFor="banner" className='absolute bottom-3 left-[450px]  z-20'>

                            <AiOutlineCamera className='dark:text-white text-black  text-[18px] cursor-pointer' />

                        </label>

                    </div>



                </div>

                <div className='1000px:w-[40%] ml-[100px] items-center text-center'>
                    <textarea
                        placeholder={`${title}`}
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text w-[600px] outline-none font-[700]  text-transparent text-center font-Poppins text-[40px]"
                        style={{ marginBottom: "25px", overflowY: "hidden" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        rows={4}
                    />


                    <textarea
                        placeholder={`${title}`}
                        className="bg-gradient-to-r dark:text-white text-black bg-clip-text w-[600px] outline-none font-[600]  text-transparent text-center font-Poppins text-[15px]"
                        style={{ marginBottom: "25px", overflowY: "hidden" }}
                        value={subTitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        rows={5}
                    />

                    <br /><br /><br />

                    <div
                        className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                        ${data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image
                                ? "!cursor-pointer !bg-[#42d383]"
                                : "!cursor-not-allowed"
                            } 
                            !rounded absolute bottom-12 right-12`}
                        onClick={
                            data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image
                                ? handleEdit
                                : () => null
                        }

                    >
                        Save
                    </div>

                </div>

            </div>

        </>

    )

}

export default EditHero