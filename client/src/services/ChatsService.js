import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Chat } from "@/models/Chat.js"
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";

class ChatsService {
    async getAllContacts(userId) {
        try {
            AppState.Chats = []
            const contacts = []
            const response = await api.get('api/chats')
            const chats = response.data.map(chatPojo => new Chat(chatPojo))
            for (let i = 0; i < chats.length; i++) {
                const chat = chats[i];
                if (chat.creatorId == userId) {
                    contacts.push(chat)
                    logger.log('Contacts', chat)
                }

            }
            AppState.Chats = contacts
            logger.log(AppState.Chats)
        }
        catch (error) {
            Pop.error('Error Getting Contacts', error);
        }
    }

}

export const chatsService = new ChatsService()