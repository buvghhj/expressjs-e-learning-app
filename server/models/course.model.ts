import mongoose, { Model, Schema } from "mongoose";
import { IComment, ICourse, ICourseData, ILink, IReview } from "../interfaces/courseModel.interface";

const reviewSchema = new Schema<IReview>({

    user: Object,

    rating: {
        type: Number,
        default: 0
    },

    comment: String,

    commentReplies: [Object]

}, { timestamps: true })

const linkSchema = new Schema<ILink>({

    title: String,

    url: String

})


const commentSchema = new Schema<IComment>({

    user: Object,

    question: String,

    questionReplies: [Object]

}, { timestamps: true })

const courseDataSchema = new Schema<ICourseData>({

    title: String,

    description: String,

    videoUrl: String,

    videoSection: String,

    videoLength: Number,

    videoPlayer: String,

    links: [linkSchema],

    suggestion: String,

    questions: [commentSchema]

})

const courseSchema = new Schema<ICourse>({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    categories: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    estimatedPrice: {
        type: Number
    },

    thumbnail: {

        public_id: {
            type: String,
        },

        url: {
            type: String,
        }

    },

    tags: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    },

    demoUrl: {
        type: String,
        required: true
    },

    benefits: [{ title: String }],

    prerequisites: [{ title: String }],

    reviews: [reviewSchema],

    courseData: [courseDataSchema],

    ratings: {
        type: Number,
        default: 0
    },

    purchased: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

export const courseModel: Model<ICourse> = mongoose.model('Course', courseSchema)