import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class ChatService {
    async getChats() {
        try {
            const chats = await dbContext.Chat.find().populate('creator participant messageHistory');

            return chats;
        } catch (error) {
            console.error('[Get Chats] There was an error getting chats', error);
        }
    }
    async deleteChat(chatId, userId) {
        try {
            const commentToDelete = await dbContext.Chat.findById(chatId)
            if (commentToDelete == null) {
                throw new Error(`invalid Chat ID: ${chatId}`)
            }
            if (commentToDelete.creatorId != userId) {
                throw new Forbidden('You cannot remove another users like')
            }

            await commentToDelete.deleteOne()
            return 'Your Chat Has Been Deleted'
        } catch (error) {
            console.error('[Delete Chat] There was an error deleting your chat', error)
        }

    }
    async createChat(attendees) {
        try {
            if (!attendees.creatorId) {
                throw new Error('CreatorId is required to create a chat.');
            }

            const chat = ({
                participants: attendees.attendees,
                creatorId: attendees.creatorId,
            });
            const savedChat = await dbContext.Chat.create(chat)
            await savedChat.populate('creator participant')
            console.log('[Create Chat] Chat created successfully:', chat);

            return savedChat;
        } catch (error) {
            console.error('[Create Chat] Error creating chat:', error);
            throw new Error('Unable to create chat. Please try again.');
        }
    }
}

export const chatService = new ChatService()