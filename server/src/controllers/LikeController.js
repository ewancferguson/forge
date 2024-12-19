import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { likeService } from "../services/LikeService";


export class LikeController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .get('', this.getAllLikes)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:likeId', this.deleteLike)
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

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    async deleteLike(request, response, next){
        try {
            const likeId = request.params.likeId
            const userId = request.userInfo.id
            const likeToDelete = await likeService.deleteLike(likeId, userId)
            response.send(likeToDelete)
        } catch (error) {
            next(error)
        }
    }
    
    
    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    async getAllLikes(request, response, next){
        try {
            const likes = await likeService.getAllLikes()
            response.send(likes)
        } catch (error) {
            next(error)
        }
    }
}