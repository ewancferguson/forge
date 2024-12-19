import Pop from "@/utils/Pop.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { Likes } from "@/models/Likes.js"
import { AppState } from "@/AppState.js"

class LikesService {

  async getLikes() {
    AppState.likes = []
    const response = await api.get('api/likes')
    const likes = response.data.map(likePojo => new Likes(likePojo))
    AppState.likes = likes
    logger.log('[Get Likes]', AppState.likes)
  }

  async likePost(listingId) {
    await api.post('api/likes', { listingId: listingId })
    Pop.success('Liked Post')
  }

}

export const likesService = new LikesService()