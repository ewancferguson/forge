import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { reviewService } from "../services/ReviewService";



export class ReviewController extends BaseController {
    constructor() {
        super('api/reviews')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createReview)
            .delete('/:reviewId', this.deleteReview)
    }

    /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
    async createReview(request, response, next) {
        try {
            const reviewData = request.body
            reviewData.creatorId = request.userInfo.id
            const review = await reviewService.createReview(reviewData)
            response.send(review)
        } catch (error) {
            next(error)
        }
    }

    /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
    async deleteReview(request, response, next){
        try {
            const reviewId = request.params.reviewId
            const userId = request.userInfo.id
            const reviewToDelete = await reviewService.deleteReview(reviewId, userId)
            response.send(reviewToDelete)
        } catch (error) {
            next(error)
        }
    }
}