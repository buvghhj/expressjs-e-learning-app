import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        createCourse: builder.mutation({

            query: (data) => ({

                url: "course/create-course",
                method: "POST",
                body: data,
                credentials: 'include' as const
            })

        }),

        getAllCourses: builder.query({

            query: () => ({

                url: "course/get-courses-admin",
                method: "GET",
                credentials: 'include' as const
            })

        }),

        editCourse: builder.mutation({

            query: ({ id, data }) => ({

                url: `course/edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: 'include' as const

            })

        }),

        getUserAllCourses: builder.query({

            query: () => ({

                url: "course/get-courses",
                method: "GET",
                credentials: 'include' as const

            })

        }),

        getCourseDetails: builder.query({

            query: (id) => ({

                url: `course/get-course/${id}`,
                method: "GET",
                credentials: 'include' as const

            })

        }),

        getCourseContent: builder.query({

            query: (id) => ({

                url: `course/get-course-content/${id}`,
                method: "GET",
                credentials: 'include' as const

            })

        }),

        addNewQuestion: builder.mutation({

            query: ({ question, courseId, contentId }) => ({

                url: 'course/add-question',
                body: { question, courseId, contentId },
                method: 'PUT',
                credentials: 'include' as const

            })

        }),

        addAnswerInQuestion: builder.mutation({

            query: ({ answer, courseId, contentId, questionId }) => ({

                url: 'course/add-answer',
                body: { answer, courseId, contentId, questionId },
                method: 'PUT',
                credentials: 'include' as const

            })

        }),

        addNewReview: builder.mutation({

            query: ({ courseId, review, rating }) => ({

                url: `course/add-review/${courseId}`,
                method: 'PUT',
                body: { review, rating },
                credentials: 'include' as const

            })

        }),

        addReplyReview: builder.mutation({

            query: ({ comment, courseId, reviewId }) => ({

                url: 'course/add-reply',
                method: 'PUT',
                body: { comment, courseId, reviewId },
                credentials: 'include' as const

            })

        })

    })

})

export const { useCreateCourseMutation, useGetAllCoursesQuery, useEditCourseMutation, useGetUserAllCoursesQuery, useGetCourseDetailsQuery,
    useGetCourseContentQuery, useAddNewQuestionMutation, useAddAnswerInQuestionMutation, useAddNewReviewMutation, useAddReplyReviewMutation } = courseApi