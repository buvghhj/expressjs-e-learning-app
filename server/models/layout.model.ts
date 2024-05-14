import mongoose, { Schema, Model } from "mongoose";
import { IBannerImage, ICategory, IFaqItem, ILayout } from "../interfaces/layoutModel.interface";

const faqSchema: Schema<IFaqItem> = new mongoose.Schema({

    question: { type: String },

    answer: { type: String }


})

const categorySchema: Schema<ICategory> = new mongoose.Schema({

    title: { type: String }

})

const bannerImageSchema: Schema<IBannerImage> = new mongoose.Schema({

    public_id: { type: String },

    url: { type: String }

})

const layoutSchema: Schema<ILayout> = new mongoose.Schema({

    type: { type: String },

    faq: [faqSchema],

    categories: [categorySchema],

    banner: {

        image: bannerImageSchema,

        title: { type: String },

        subTitle: { type: String }

    }

})

export const layoutModel: Model<ILayout> = mongoose.model('Layout', layoutSchema)