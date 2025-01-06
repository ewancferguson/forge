import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Listing } from "@/models/Listing.js"
import { AppState } from "@/AppState.js"

class PostsService {
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

  async getListingsByProfileId(profileId) {
    AppState.profileListings = []
    const response = await api.get(`api/profiles/?creatorId=${profileId}/posts`)
    logger.log(`[GOT POSTS BY PROFILE ID]`, response.data)
    AppState.profileListings = response.data.map(listingData => new Listing (listingData))
  }
}

export const postsService = new PostsService()