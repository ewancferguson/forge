import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentService } from "../services/CommentService";


export class CommentController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createComment(request, response, next){
        try {
            const commentData = request.body
            commentData.creatorId = request.userInfo.id
            const comment = await commentService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}