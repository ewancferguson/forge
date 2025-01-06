import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Listing } from "@/models/Listing.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async deleteListing(listingId) {
    const response = await api.delete(`api/listings/${listingId}`)
    logger.log(response.data)
    const listingIndex = AppState.listings.findIndex(listing => listing.id == listingId)
    AppState.listings.splice(listingIndex, 1)
  }
  async createListing(postData) {
    const response = await api.post('api/listings', postData)
    logger.log('CREATED POST', response.data)
  }
  async getAllPosts() {
    const response = await api.get('api/listings')
    logger.log('[Get All Posts]', response.data)
    const listings = response.data.map(listingPOJO => new Listing(listingPOJO))
    AppState.listings = listings
    AppState.homePageListings = listings.slice(0, 6);
  }
}

export const postsService = new PostsService()