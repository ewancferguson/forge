import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class LikeService {

    async getAllLikes() {
        const likes = await dbContext.Like.find().populate('account', 'name picture')
        return likes
    }

    async createLike(likeData) {
        const like = await dbContext.Like.create(likeData)
        await like.populate('account')
        await like.populate({
            path: 'listing',
            populate: {
                path: 'likeCount'
            }
        })
        await like.populate({
            path: 'service',
            populate: {
                path: 'likeCount'
            }
        })
        return like
    }

    async deleteLike(likeId, userId) {
        const likeToDelete = await dbContext.Like.findById(likeId)
        if (likeToDelete == null) {
            throw new Error(`invalid like ID: ${likeId}`)
        }
        if (likeToDelete.accountId != userId) {
            throw new Forbidden('You cannot remove another users like')
        }
        await likeToDelete.deleteOne()
        return 'Like has been deleted'
    }

    async getLikesByListingId(listingId) {
        const likes = await dbContext.Like.find({ listingId: listingId }).populate('account', 'name picture')
        return likes
    }

    async getLikesByServiceId(serviceId) {
        const likes = await dbContext.Like.find({ serviceId: serviceId }).populate('account', 'name picture')
        return likes
    }


}

export const likeService = new LikeService()