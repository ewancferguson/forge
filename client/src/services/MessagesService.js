import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";
import { Message } from "@/models/Messages.js";

class MessagesService {
    async sendMessage(data) {
        try {
            const response = await api.post('api/messages', data)
            const message = new Message(response.data)
            AppState.Messages.push(message)
            logger.log(AppState.Messages)
        }
        catch (error) {
            Pop.error(error);
        }
    }
    async getMessages(id) {
        try {
            AppState.Messages = []
            const response = await api.get(`api/chats/${id}/messages`)
            const message = response.data.map(messagePojo => new Message(messagePojo))
            logger.log('Got Messages', response.data)
            AppState.Messages = message
            logger.log(AppState.Messages)
        }
        catch (error) {
            Pop.error('Error getting messages', error);
        }
    }

}

export const messagesService = new MessagesService()