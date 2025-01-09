import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Follower } from "@/models/Follower.js"
import { AppState } from "@/AppState.js"

class FollowerService {

  
  async getFollowersByAccountId(profileId) {
    AppState.profileFollowers = []
    const response = await api.get(`api/profiles/${profileId}/followers`)
    logger.log('getting followers by ID', response.data)
    const followers = response.data.map(followerPOJO => new Follower(followerPOJO))
    AppState.profileFollowers = followers
    logger.log('current follower appstate', AppState.profileFollowers)
  }
  async createFollower(followingId) {
    const response = await api.post('api/followers', followingId)
    logger.log('creating follower', response.data)
    const follower = new Follower(response.data)
    AppState.profileFollowers.push(follower)
  }

  async unfollowProfile(followerObjectId) {
    const response = await api.delete(`api/followers/${followerObjectId}`)
    logger.log('unfollowing account', response.data)
  }
}

export const followerService = new FollowerService()