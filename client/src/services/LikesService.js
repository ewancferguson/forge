import Pop from "@/utils/Pop.js"
import { api } from "./AxiosService.js"

class LikesService {
  async likePost(listingId) {
    const response = await api.post('api/likes', listingId)
    Pop.success('Liked Post' + response)
  }

}

export const likesService = new LikesService()