import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Listing } from "@/models/Listing.js"
import { AppState } from "@/AppState.js"

class ListingsService{
  async getListingById(listingId) {
    const response = await api(`api/listings/${listingId}`)
    logger.log('got listing by id', response.data)
    const listing = new Listing(response.data)
    AppState.activeListing = listing
  }

}

export const listingsService = new ListingsService()