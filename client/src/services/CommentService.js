import { Comment } from "@/models/Comment.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class CommentService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log(response.data)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)
  }
  async getCommentsbyListingId(listingId) {
    const response = await api.get(`api/listings/${listingId}/comments`)
    logger.log(response.data, 'got comments')
    const comments = response.data.map(commentPOJO => new Comment(commentPOJO))
    AppState.comments = comments
  }

}

export const commentService = new CommentService()