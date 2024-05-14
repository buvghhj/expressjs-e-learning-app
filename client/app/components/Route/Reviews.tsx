import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from '../Review/ReviewCard'

type Props = {}

export const reviews = [

    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100257.jpg?t=st=1710474949~exp=1710478549~hmac=acd39d069e5579ebb3a3dbf6267bbac80b3c9c4c26a463558b1a5f1153dbad27&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit ea non totam!   Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?t=st=1710475481~exp=1710479081~hmac=3cca1d6b73a246fc75d958dc13b5b20fde67a70462a328b5b095f67b4c066ff5&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam!   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi modi quia non totam!,"
    },
    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1710475515~exp=1710479115~hmac=6e89ac5da5d5d37038255ac02327c58086843bed9231794758d360fbf944e6af&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam!   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam!, Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam"
    },
    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/3d-illustration-cartoon-character-hoodie-cap_1142-48674.jpg?t=st=1710476030~exp=1710479630~hmac=dc978e5fb0758299411a77983d6fc2092ced000c92a764008d2f9bab412bc57b&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet conselit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam!"
    },
    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100271.jpg?t=st=1710476071~exp=1710479671~hmac=e3daf20bbafdda0f69236cb389a166078c24bdfa2eaa41f871aa6f81f2a23ae4&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque.uam quidem neque. totam!"
    },
    {
        name: "Gene Bates",
        avatar: "https://img.freepik.com/free-photo/view-3d-happy-woman-with-mouth-wide-open_23-2150709950.jpg?t=st=1711779288~exp=1711782888~hmac=ff2f56e79aa52546f66b62619e3f0bcee2349260ea9ebf050b0141681e3100e7&w=740",
        profession: "Studen | Cambridge University",
        comment: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, l adipisicing dolor sit amet consectetur adipisicing amet consectetur adipisicing eelit."
    },
]

const Reviews = (props: Props) => {

    return (

        <div className='w-[90%] 800px:w-[85%] m-auto !mt-28'>

            <div className='w-full 800px:flex items-center'>

                <div className='800px:w-[50%] w-full'>

                    <Image src={require("../../../public/img/c.png")} width={450} height={450} alt='' />

                </div>

                <div className='800px:w-[50%] w-full'>

                    <h3 className={`${styles.title} 800px:!text-[40px]`}>

                        Our student are <span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent'>Our Strength</span>{""}
                        <br />
                        see what they say about us
                    </h3>
                    <br />
                    <p className={`${styles.label}`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste quisquam quidem neque. Numquam praesentium molestiae, expedita incidunt, laboriosam, eligendi harum fugit earum facilis et eaque modi quia non totam!
                    </p>

                </div>
                <br /><br />


            </div>
            <div className='!mt-28 grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]'>

                {reviews && reviews.map((i: any, index: number) => <ReviewCard item={i} key={index} />)}

            </div>
        </div>

    )
}

export default Reviews