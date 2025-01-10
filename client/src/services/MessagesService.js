import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import Pop from "@/utils/Pop.js";
import { Message } from "@/models/Messages.js";

class MessagesService {
    async sendMessage(data) {
        try {
            const response = await api.post('api/messages', data)
            const message = new Message(response.data)
            AppState.Messages.push(message)
        }
        catch (error) {
            Pop.error(error);
        }
    }
    async getMessages(id) {
        try {
            AppState.Messages = [];
            const response = await api.get(`api/chats/${id}/messages`);
            const messages = response.data.map(messagePojo => new Message(messagePojo));

            AppState.Messages = messages;

            if (AppState.Messages.length === 0) {
                return false;
            }
            return true;
        } catch (error) {
            Pop.error('Error getting messages', error);
            return false;
        }
    }
}

export const messagesService = new MessagesService()