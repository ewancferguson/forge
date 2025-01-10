import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Chat } from "@/models/Chat.js"
import Pop from "@/utils/Pop.js";

class ChatsService {
    async getAllContacts(userId) {
        try {
            AppState.Chats = []
            const contacts = []
            const response = await api.get('api/chats')
            const chats = response.data.map(chatPojo => new Chat(chatPojo))

            for (let i = 0; i < chats.length; i++) {
                const chat = chats[i]
                if (chat.creatorId === userId || chat.participantInfo?.id === userId) {
                    contacts.push(chat)
                }
            }

            AppState.Chats = contacts
        } catch (error) {
            Pop.error('Error Getting Contacts', error)
        }
    }

}

export const chatsService = new ChatsService()