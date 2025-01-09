import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { chatService } from "../services/ChatService";
import { messagesService } from "../services/MessagesService";

export class MessageController extends BaseController {
    constructor() {
        super('api/messages')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            // use request body in post request to send chat ID
            .post('', this.sendMessage)
        // .delete('/:messageId', this.deleteMessage)
    }
    async sendMessage(request, response, next) {
        try {
            const data = request.body
            data.creatorId = request.userInfo.id
            const message = await messagesService.sendMessage(data)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}
