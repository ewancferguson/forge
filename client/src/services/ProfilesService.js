import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";
import { AppState } from "@/AppState.js";
import { Profile } from "@/models/Profile.js";
import { Listing } from "@/models/Listing.js";


class ProfilesService{
  async getProfileById(profileId){
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('got profile by id', response.data)
    const profile = new Account(response.data)
    AppState.activeProfile = profile
  }

  async getListingsByProfileId(profileId) {
    AppState.profileListings = []
    const response = await api.get(`api/profiles/${profileId}/posts`)
    logger.log(`[GOT POSTS BY PROFILE ID]`, response.data)
    AppState.profileListings = response.data.map(listingData => new Listing (listingData))
  }
}

export const profilesService = new ProfilesService()