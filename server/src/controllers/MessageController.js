import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { chatService } from "../services/ChatService";

export class MessageController extends BaseController {
    constructor() {
        super('api/chats')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
        //         .post('/chatId', this.sendMessage)
        //         .get('/chatId', this.getMessages)
        //         .delete('/:chatId/:messageId', this.deleteMessage)
        // }
    }
}