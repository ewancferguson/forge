import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class ReviewService {


    async getReviewsByAccountId(accountId) {
        const reviews = await dbContext.Review.find({ accountId: accountId }).populate('creator', 'name picture')
        return reviews
    }

    async createReview(reviewData) {
        const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('account', 'name picture')
        return review
    }

    async deleteReview(reviewId, userId) {
        const reviewToDelete = await dbContext.Review.findById(reviewId)
        if (reviewToDelete == null) {
            throw new Error(`invalid listing ID: ${reviewId}`)
        }
        if (reviewToDelete.creatorId != userId) {
            throw new Forbidden('Cannot delete a listing that is not yours')
        }
        await reviewToDelete.deleteOne()
        return 'Review has been deleted'
    }
}


export const reviewService = new ReviewService()