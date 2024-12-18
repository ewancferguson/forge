import { dbContext } from "../db/DbContext"


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
}

export const likeService = new LikeService()