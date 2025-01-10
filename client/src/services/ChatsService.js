import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Chat } from "@/models/Chat.js"
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";

class ChatsService {
    async getAllContacts() {
        try {
            AppState.Chats = []
            const response = await api.get('api/chats')
            const chats = response.data.map(chatPojo => new Chat(chatPojo))
            AppState.Chats = chats
            logger.log(AppState.Chats)
        }
        catch (error) {
            Pop.error('Error Getting Contacts', error);
        }
    }

}

export const chatsService = new ChatsService()