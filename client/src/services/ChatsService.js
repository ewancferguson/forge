import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Chat } from "@/models/Chat.js"
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";

class ChatsService {
    async deleteChat(id) {
        try {
            const confirm = await Pop.confirm('Are You Sure You Want To Delete The Chat?')
            if (confirm) {
                await api.delete(`api/chats/${id}`)
                let userId = AppState.account.id
                this.getAllContacts(userId)
                Pop.success('Successfully Deleted Chats!')
            } else {
                return
            }

        }
        catch (error) {
            Pop.error(error);
        }
    }
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

    async createChat(userId) {
        try {
            await api.post('api/chats', { "attendees": [`${userId}`] })
        } catch (error) {
            logger.error('error creating chat', error)
        }
    }

}

export const chatsService = new ChatsService()