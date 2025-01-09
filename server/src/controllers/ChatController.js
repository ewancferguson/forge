import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { chatService } from "../services/ChatService";
import { messagesService } from "../services/MessagesService";

export class ChatController extends BaseController {
    constructor() {
        super('api/chats')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createChat)
            .get('', this.getChats)
            .get('/:chatId/messages', this.getMessagesByChatId)
            .delete('/:chatId', this.deleteChat)
    }
    async getMessagesByChatId(request, response, next) {
        try {
            const chatId = request.params.chatId
            const messages = await messagesService.getMessagesByChatId(chatId)
            response.send(messages)
        } catch (error) {
            next(error)
        }
    }
    async getChats(request, response, next) {
        try {
            const chats = await chatService.getChats()
            response.send(chats)
        } catch (error) {
            next(error)
        }
    }
    async deleteChat(request, response, next) {
        try {
            const chatId = request.params.chatId
            const userId = request.userInfo.id
            const chat = await chatService.deleteChat(chatId, userId)
            response.send(chat)
        } catch (error) {
            next(error)
        }
    }
    async createChat(request, response, next) {
        try {
            const { attendees } = request.body;
            if (!attendees || !Array.isArray(attendees) || attendees.length === 0) {
                return response.status(400).send({ error: "Attendees list is required and must be a non-empty array." });
            }

            const chatData = {
                attendees,
                creatorId: request.userInfo.id,
            };


            const chat = await chatService.createChat(chatData);

            response.status(201).send(chat);
        } catch (error) {
            console.error("Error creating chat:", error);

            next(error);
        }
    }

}