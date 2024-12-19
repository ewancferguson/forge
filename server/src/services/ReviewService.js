import { dbContext } from "../db/DbContext"


class ReviewService {
    async getReviewsByAccountId(accountId) {
        const reviews = await dbContext.Review.find({ accountId: accountId }).populate('creator', 'name picture')
        return reviews
    }

    async createReview(reviewData) {
        const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('account', 'name picture')
        return review
    }

}


export const reviewService = new ReviewService()