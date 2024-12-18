import { dbContext } from "../db/DbContext"


class ListingService {


    async getAllListings() {
        const listings = dbContext.Listing.find().populate('creator', 'name picture isBusiness')
        return listings
    }


    async createListing(listingData) {
        const listing = await dbContext.Listing.create(listingData)
        await listing.populate('creator', 'name picture')
        return listing
    }

    async getListingById(listingId) {
        const listing = await dbContext.Listing.findById(listingId).populate('creator', 'name picture')
        if(listing.id == null) {throw new Error(`Listing ID of ${listing.id} is invalid`)}
        return listing
    }
}

export const listingService = new ListingService()