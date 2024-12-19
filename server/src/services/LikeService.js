import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class LikeService {
   
    async createLike(likeData) {
        const like = await dbContext.Like.create(likeData)
        await like.populate('account')
        await like.populate({
            path: 'listing',
            populate: {
                path: 'likeCount'
            }
        })
        return like
    }

   async deleteLike(likeId, userId) {
        const likeToDelete = await dbContext.Like.findById(likeId)
        if(likeToDelete == null){
            throw new Error(`invalid like ID: ${likeId}`)
        }
        if(likeToDelete.accountId != userId){
            throw new Forbidden('You cannot remove your like')
        }
        await likeToDelete.deleteOne()
        return 'Like has been deleted'
    }

}

export const likeService = new LikeService()