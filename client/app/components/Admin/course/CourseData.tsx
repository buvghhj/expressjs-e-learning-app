import { styles } from '../../../../app/styles/style'
import React, { FC } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import toast from 'react-hot-toast'

type Props = {

    benefits: { title: string }[]

    setBenefits: (benefits: { title: string }[]) => void

    prerequisites: { title: string }[]

    setPrerequisites: (prerequisites: { title: string }[]) => void

    active: number

    setActive: (active: number) => void

}

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    const handleBenefitChange = (index: number, value: any) => {

        const updatedBenefits = [...benefits]

        updatedBenefits[index].title = value

        setBenefits(updatedBenefits)

    }

    const handleAddBenefit = () => {

        setBenefits([...benefits, { title: "" }])

    }

    const handlePrerequisitesChange = (index: number, value: any) => {

        const updatePrerequisites = [...prerequisites]

        updatePrerequisites[index].title = value

        setPrerequisites(updatePrerequisites)

    }

    const handleAddPrerequisites = () => {

        setPrerequisites([...prerequisites, { title: "" }])

    }

    const prevButton = () => {

        setActive(active - 1)


    }

    const handleOptions = () => {

        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {

            setActive(active + 1)

        } else {

            toast.error("Please fill the fields for go to next")

        }

    }

    return (

        <div className='w-[80%] m-auto mt-24 block'>

            <div>

                <label htmlFor="" className={`${styles.label} text-[20px]`}>
                    What are the benefits for students in this course ?
                </label>

                <br />

                {benefits.map((benefit: any, index: number) => (

                    <input
                        type="text"
                        key={index}
                        name='benefit'
                        placeholder='You will be able to build a full stack LMS Platform...'
                        className={`${styles.input} my-2`}
                        required
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />

                ))}

                <AddCircleIcon
                    className='text-black dark:text-white'
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefit}
                />

            </div>

            <div>

                <label htmlFor="" className={`${styles.label} text-[20px]`}>
                    What are the prerequisites for starting this course ?
                </label>

                <br />

                {prerequisites.map((prerequisite: any, index: number) => (

                    <input
                        type="text"
                        key={index}
                        name='prerequisites'
                        placeholder='You need basic knowledge of MERN stack'
                        className={`${styles.input} my-2`}
                        required
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                    />

                ))}

                <AddCircleIcon
                    className='text-black dark:text-white'
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddPrerequisites}
                />

            </div>

            <div className='w-full flex items-center justify-between'>

                <div className='w-full 800px:w-[180px] h-[40px] items-center bg-[#37a39a] dark:text-white justify-center flex text-center text-[#000] rounded mt-8 cursor-pointer' onClick={() => prevButton()}>
                    Prev
                </div>

                <div className='w-full 800px:w-[180px] h-[40px] items-center bg-[#37a39a] dark:text-white justify-center flex text-center text-[#000] rounded mt-8 cursor-pointer' onClick={() => handleOptions()}>
                    Next
                </div>

            </div>
            <br />
            <br />
            <br />

        </div>

    )
}

export default CourseData