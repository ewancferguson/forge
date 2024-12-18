import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


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

    async deleteListing(userId, listingId) {
        const listingToDelete = await dbContext.Listing.findById(listingId)
        if (listingToDelete == null){
            throw new Error(`invalid listing ID: ${listingId}`)
        }
        if(listingToDelete.creatorId != userId){
            throw new Forbidden('Cannot delete a listing that is not yours')
        }
        await listingToDelete.deleteOne()
        return 'listing has been deleted'
    }


}

export const listingService = new ListingService()