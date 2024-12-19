import { dbContext } from "../db/DbContext"


class FollowersService{

    async createFollower(followerData) {
        const follower = await dbContext.Follower.create(followerData)
        await follower.populate('follower', 'name picture')
        await follower.populate('following')
        return follower
    }

}

export const followersService = new FollowersService()