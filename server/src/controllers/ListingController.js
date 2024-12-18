import { listingService } from "../services/ListingService";
import BaseController from "../utils/BaseController";



export class ListingController extends BaseController{
    constructor(){
        super('api/listings')
        this.router
        .get('', this.getAllListings)
    }


    async getAllListings(request, response, next){
        try {
            const listing = await listingService.getAllListings()
            response.send(listing)
        } catch (error) {
            next(error)
        }
    }
}