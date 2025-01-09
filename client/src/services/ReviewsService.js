import { AppState } from "@/AppState.js"
import { Review } from "@/models/Review.js"
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class ReviewsService{
  async getReviewsByProfileId(profileId) {
    AppState.profileReviews = []
    const response = await api.get(`api/profiles/${profileId}/reviews`)
    logger.log(`[GOT Review BY PROFILE ID]`, response.data)
    AppState.profileReviews = response.data.map(reviewData => new Review (reviewData))
  }
  }

export const reviewsService = new ReviewsService()