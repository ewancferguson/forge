import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { listingService } from "./ListingService"


class CommentService {

    async editComment(commentData, commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (comment.creatorId != userId) {
            throw new Forbidden('Cannot edit comment that is not yours')
        }
        if(commentData.body) comment.body = commentData.body ?? comment.body
        await comment.save()
        return comment
    }

    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comment.findById(commentId)
        if (commentToDelete == null) {
            throw new Error(`Invalid comment ID: ${commentId}`)
        }
        if (commentToDelete.creatorId != userId) {
            throw new Forbidden('Cannot delete comment that is not yours')
        }
        await commentToDelete.deleteOne()
        return 'Comment has been deleted'
    }

    async createComment(commentData) {
        const listing = await listingService.getListingById(commentData.listingId)
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getCommentsByListingId(listingId) {
        const comments = dbContext.Comment.find({ listingId: listingId }).populate('creator', 'name picture')
        return comments
    }

}


export const commentService = new CommentService()