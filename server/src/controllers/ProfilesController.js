import { request } from 'express'
import { listingService } from '../services/ListingService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'
import { followersService } from '../services/FollowersService.js'
import { reviewService } from '../services/ReviewService.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('/:profileId/followers', this.getFollowersByAccountId)
      .get('/:profileId/following', this.getFollowingByAccountId)
      .get('/:profileId/listings', this.getListingsByAccountId)
      .get('/:profileId/reviews', this.getReviewsByAccountId)
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:profileId/posts', this.getPostsByProfileId)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }


  /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async getFollowersByAccountId(request, response, next) {
    try {
      const followingId = request.params.profileId
      const followers = await followersService.getFollowersByAccountId(followingId)
      response.send(followers)
    } catch (error) {
      next(error)
    }
  }

  /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async getFollowingByAccountId(request, response, next) {
    try {
      const followerId = request.params.profileId
      const following = await followersService.getFollowingByAccountId(followerId)
      response.send(following)
    } catch (error) {
      next(error)
    }
  }

  async getPostsByProfileId(req, res, next) {
    try {
      const profileId = req.params.profileId
      const postsByProfileId = await listingService.postsByProfileId(profileId)
      res.send(postsByProfileId)
    } catch (error) {
      next(error)
    }
  }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
async getListingsByAccountId(request, response, next) {
  try {
    const creatorId = request.params.profileId
    const listings = await listingService.getListingsByAccountId(creatorId)
    response.send(listings)
  } catch (error) {
    next(error)
  }
}

  /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
async getReviewsByAccountId(request, response, next){
  try {
    const accountId = request.params.profileId
    const review = await reviewService.getReviewsByAccountId(accountId)
    response.send(review)
  } catch (error) {
    next(error)
  }
}
}
