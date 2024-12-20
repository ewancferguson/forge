import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { servicesService } from "../services/ServicesService";


export class ServicesController extends BaseController {
    constructor() {
        super('api/services')
        this.router
            // .get('', this.getAllServices)
            // .get('/:listingId', this.getServiceById)
            // .get('/:listingId/likes', this.getLikesByServiceId)
            // .get('/:listingId/comments', this.getCommentsByServiceId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createService)
            // .put('/:listingId', this.editService)
            // .delete('/:listingId', this.deleteService)
    }


        /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
        async createService(request, response, next) {
            try {
                const serviceData = request.body
                serviceData.creatorId = request.userInfo.id
                const service = await servicesService.createListing(serviceData)
                response.send(service)
            } catch (error) {
                next(error)
            }
        }
}
