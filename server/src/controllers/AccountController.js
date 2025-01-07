import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { followersService } from '../services/FollowersService'
import { listingService } from '../services/ListingService'
import { reviewService } from '../services/ReviewService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:profileId/listings', this.getListingsByAccountId)
      .get('/:profileId/reviews', this.getReviewsByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
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
