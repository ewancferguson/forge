import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class FollowersService {

    async createFollower(followerData) {
        const follower = await dbContext.Follower.create(followerData)
        await follower.populate('follower', 'name picture')
        await follower.populate('following')
        return follower
    }

    async deleteFollower(followerId, userId) {
        const followerToDelete = await dbContext.Follower.findById(followerId)
        if (followerToDelete == null) { throw new Error(`invalid Follower ID: ${followerId}`) }
        if (followerToDelete.followerId != userId) { throw new Forbidden('You cannot unfollow') }
        await followerToDelete.deleteOne()
        return 'No longer following account'
    }

    async getFollowersByAccountId(followingId) {
        const followers = await dbContext.Follower.find({ followingId: followingId }).populate('follower', 'name picture')
        return followers
    }

    async getFollowingByAccountId(followerId) {
        const followers = await dbContext.Follower.find({ followerId: followerId }).populate('follower', 'name picture')
        return followers
    }
}

export const followersService = new FollowersService()