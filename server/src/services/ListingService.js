import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"


class ListingService {

    async editListing(listingData, userId, listingId) {
        const listing = await dbContext.Listing.findById(listingId)
        if (listing.creatorId != userId) { throw new Error('cannot update post that is not yours') }
        if (listing.body) listing.body = listingData.body ?? listing.body
        if (listing.type) listing.type = listingData.type ?? listing.type
        if (listing.pictures) listing.pictures = listingData.pictures ?? listing.pictures
        if (listing.minBudget) listing.minBudget = listingData.minBudget ?? listing.minBudget
        if (listing.maxBudget) listing.maxBudget = listingData.maxBudget ?? listing.maxBudget
        listing.isResolved = !listing.isResolved
        await listing.save()
        return listing
    }

    async getAllListings() {
        const listings = dbContext.Listing.find().populate('creator', 'name picture isBusiness').populate('likeCount')
        return listings
    }


    async createListing(listingData) {
        const listing = await dbContext.Listing.create(listingData)
        await listing.populate('creator', 'name picture')
        return listing
    }

    async getListingById(listingId) {
        const listing = await dbContext.Listing.findById(listingId).populate('creator', 'name picture').populate('likeCount')
        if (listing.id == null) { throw new Error(`Listing ID of ${listing.id} is invalid`) }
        return listing
    }


    async deleteListing(userId, listingId) {
        const listingToDelete = await dbContext.Listing.findById(listingId)
        if (listingToDelete == null) {
            throw new Error(`invalid listing ID: ${listingId}`)
        }
        if (listingToDelete.creatorId != userId) {
            throw new Forbidden('Cannot delete a listing that is not yours')
        }
        await listingToDelete.deleteOne()
        return 'listing has been deleted'
    }

    async getListingsByAccountId(creatorId) {
        const listings = await dbContext.Listing.find({ creatorId: creatorId }).populate('creator', 'name picture').populate('likeCount')
        return listings
    }

    async postsByProfileId(profileId) {
        logger.log('profileId', profileId)
        const postsByProfileId = await dbContext.Listing.find({ profileId: profileId }).populate('creator', 'name picture')
        if (postsByProfileId == null) throw new Error(`Invalid id: ${profileId}`)
        return postsByProfileId
    }
}

export const listingService = new ListingService()