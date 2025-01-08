import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Follower } from "@/models/Follower.js"
import { AppState } from "@/AppState.js"

class FollowerService{

 async getFollowersByAccountId(profileId) {
  AppState.profileFollowers = []
   const response = await api.get(`api/profiles/${profileId}/followers`)
   logger.log('getting followers by ID', response.data)
   const followers = response.data.map(followerPOJO => new Follower(followerPOJO))
   AppState.profileFollowers = followers
   logger.log('current follower appstate', AppState.profileFollowers)
 }
 async createFollower(profileData) {
    const response = await api.post('api/followers', profileData)
    logger.log('creating follower', response.data)
  }
}

export const followerService = new FollowerService()