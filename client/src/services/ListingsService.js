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

  async getMyListings() {
    AppState.listings = []
    const response = await api.get(`api/account`)
    logger.log(`[GOT LISTINGS BY ACCOUNT]`, response.data)
    AppState.listings = response.data.map(listingData => new Listing (listingData))
  }

}

export const listingsService = new ListingsService()