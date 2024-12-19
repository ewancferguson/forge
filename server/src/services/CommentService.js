import { dbContext } from "../db/DbContext"
import { listingService } from "./ListingService"


class CommentService{

  async createComment(commentData) {
       const listing = await listingService.getListingById(commentData.listingId)
       const comment = await dbContext.Comment.create(commentData)
       await comment.populate('creator', 'name picture')
       return comment
   }

   async getCommentsByListingId(listingId) {
        const comments = dbContext.Comment.find({listingId: listingId}).populate('creator', 'name picture')
        return comments
    }

}


export const commentService = new CommentService()