import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { reviewService } from "../services/ReviewService";



export class ReviewController extends BaseController {
    constructor() {
        super('api/reviews')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createReview)
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
}