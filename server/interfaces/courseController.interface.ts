export interface IAddQuestionData {

    question: string

    courseId: string

    contentId: string

}
export interface IAddAnswerData {

    answer: string

    courseId: string

    contentId: string

    questionId: string

}

export interface IAddReviewData {

    review: string

    courseId: string

    rating: number

    userId: string

}

export interface IAddReplyToReviewData {

    comment: string

    courseId: string

    reviewId: string

}
