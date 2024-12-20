import { dbContext } from "../db/DbContext"

class ServicesService{

    async createListing(serviceData) {
        const service = await dbContext.Service.create(serviceData)
        await service.populate('creator', 'name picture')
        return service
    }

}


export const servicesService = new ServicesService()