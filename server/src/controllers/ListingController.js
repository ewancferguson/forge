import { Auth0Provider } from "@bcwdev/auth0provider";
import { listingService } from "../services/ListingService";
import BaseController from "../utils/BaseController";



export class ListingController extends BaseController {
    constructor() {
        super('api/listings')
        this.router
            .get('', this.getAllListings)
            .get('/:listingId', this.getListingById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createListing)
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
}

