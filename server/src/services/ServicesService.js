import { dbContext } from "../db/DbContext"

class ServicesService{

    async editService(serviceData, serviceId, userId) {
        const service = await dbContext.Service.findById(serviceId)
        if (service.creatorId != userId) { throw new Error('cannot update post that is not yours') }
        if(service.type) service.type = serviceData.type ?? service.type
        if(service.cost) service.cost = serviceData.cost ?? service.cost
        if(service.body) service.body = serviceData.body ?? service.body
        if(service.pictures) service.pictures = serviceData.pictures ?? service.pictures
        await service.save()
        return service
        
    }

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