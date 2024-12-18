import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { likeService } from "../services/LikeService";


export class LikeController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    async createLike(request, response, next) {
        try {
            const likeData = request.body
            likeData.accountId = request.userInfo.id
            const like = await likeService.createLike(likeData)
            response.send(like)
        } catch (error) {
            next(error)
        }
    }
}