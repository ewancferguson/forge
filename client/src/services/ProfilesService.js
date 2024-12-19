import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";
import { AppState } from "@/AppState.js";
import { Profile } from "@/models/Profile.js";


class ProfilesService{
  async getProfileById(profileId){
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('got profile by id', response.data)
    const profile = new Account(response.data)
    AppState.activeProfile = profile
  }



}

export const profilesService = new ProfilesService()