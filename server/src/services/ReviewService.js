import { dbContext } from "../db/DbContext"


class ReviewService {

    async createReview(reviewData) {
        const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('account', 'name picture')
        return review
    }

}


export const reviewService = new ReviewService()