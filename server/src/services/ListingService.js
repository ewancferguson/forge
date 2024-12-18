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

    async listingIsResolved(listingData, userId, listingId) {
        const listing = await dbContext.Listing.findById(listingId)
        if(listing.creatorId != userId) {throw new Error('cannot update post that is not yours')}
        listing.isResolved = !listing.isResolved
        await listing.save()
        return listing
    }

}

export const listingService = new ListingService()