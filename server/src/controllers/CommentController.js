import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentService } from "../services/CommentService";


export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .put('/:commentId', this.editComment)
            .delete('/:commentId', this.deleteComment)
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createComment(request, response, next) {
        try {
            const commentData = request.body
            commentData.creatorId = request.userInfo.id
            const comment = await commentService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    
        /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async editComment(request, response, next){
        try {
            const commentData = request.body
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const comment = await commentService.editComment(commentData, commentId, userId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const commentToDelete = await commentService.deleteComment(commentId, userId)
            response.send(commentToDelete)
        } catch (error) {
            next(error)
        }
    }
}