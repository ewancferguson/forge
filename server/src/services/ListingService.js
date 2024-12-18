import { dbContext } from "../db/DbContext"


class ListingService{


   async getAllListings() {
        const listings = dbContext.Listing.find().populate('creator', 'name picture')
        return listings
    }

}

export const listingService = new ListingService()