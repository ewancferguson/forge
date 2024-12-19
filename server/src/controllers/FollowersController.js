import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { followersService } from "../services/FollowersService";


export class FollowersController extends BaseController{
    constructor(){
        super('api/followers')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createFollower)
    }

        /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createFollower(request, response, next){
        try {
            const followerData = request.body
            followerData.accountId = request.userInfo.id
            const follower = await followersService.createFollower(followerData)
            response.send(follower)
        } catch (error) {
            next(error)
        }
    }
}