import { Auth0Provider } from "@bcwdev/auth0provider";
import { listingService } from "../services/ListingService";
import BaseController from "../utils/BaseController";
import { likeService } from "../services/LikeService";



export class ListingController extends BaseController {
    constructor() {
        super('api/listings')
        this.router
            .get('', this.getAllListings)
            .get('/:listingId', this.getListingById)
            .get('/:listingId/likes', this.getLikesByListingId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createListing)
            .put('/:listingId', this.listingIsResolved)
            .delete('/:listingId', this.deleteListing)
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async getAllListings(request, response, next) {
        try {
            const listing = await listingService.getAllListings()
            response.send(listing)
        } catch (error) {
            next(error)
        }
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createListing(request, response, next) {
        try {
            const listingData = request.body
            listingData.creatorId = request.userInfo.id
            const listing = await listingService.createListing(listingData)
            response.send(listing)
        } catch (error) {
            next(error)
        }
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async getListingById(request, response, next) {
        try {
            const listingId = request.params.listingId
            const listing = await listingService.getListingById(listingId)
            response.send(listing)
        } catch (error) {
            next(error)
        }
    }


        /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async listingIsResolved(request, response, next){
        try {
            const listingData = request.body
            const userId = request.userInfo.id
            const listingId = request.params.listingId
            const listing = await listingService.listingIsResolved(listingData, userId, listingId)
            response.send(listing)
        } catch (error) {
            next(error)
        }
    }

        /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async  deleteListing(request, response, next){
    try {
        const userId = request.userInfo.id
        const listingId = request.params.listingId
        const listing = await listingService.deleteListing(userId, listingId)
        response.send(listing)
    } catch (error) {
        next(error)
    }
  }

        /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async getLikesByListingId(request, response, next){
    try {
        const listingId = request.params.listingId
        const likes = await likeService.getLikesByListingId(listingId)
        response.send(likes)
    } catch (error) {
        next(error)
    }
  }
}

