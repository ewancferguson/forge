import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Listing } from "@/models/Listing.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async getAllPosts() {
    const response = await api.get('api/listings')
    logger.log(response.data)
    const listings = response.data.map(listingPOJO => new Listing(listingPOJO))
    AppState.listings = listings
    AppState.homePageListings = listings.slice(0, 6);

  }

}

export const postsService = new PostsService()