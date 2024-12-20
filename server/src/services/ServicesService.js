import { dbContext } from "../db/DbContext"

class ServicesService{

    async getServiceById(serviceId) {
        const service = await dbContext.Service.findById(serviceId).populate('creator', 'name picture').populate('likeCount')
        if (service.id == null) { throw new Error(`Service ID of ${service.id} is invalid`) }
        return service
    }
    async getAllServices() {
        const service = await dbContext.Service.find().populate('creator', 'name picture').populate('likeCount')
        return service
    }

    async createListing(serviceData) {
        const service = await dbContext.Service.create(serviceData)
        await service.populate('creator', 'name picture')
        return service
    }

}


export const servicesService = new ServicesService()