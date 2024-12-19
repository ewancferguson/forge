import Pop from "@/utils/Pop.js"
import { api } from "./AxiosService.js"

class LikesService {
  async likePost(listingId) {
    await api.post('api/likes', { listingId: listingId })
    Pop.success('Liked Post')
  }

}

export const likesService = new LikesService()