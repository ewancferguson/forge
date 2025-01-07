import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class FollowerService{

 async getFollowersByAccountId(profileId) {
   const response = await api.get(`api/account/${profileId}/followers`)
   logger.log('getting followers by ID', response.data)
 }
 async createFollower(profileData) {
    const response = await api.post('api/followers', profileData)
    logger.log('creating follower', response.data)
  }
}

export const followerService = new FollowerService()