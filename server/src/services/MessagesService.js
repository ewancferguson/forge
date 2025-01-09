import { dbContext } from "../db/DbContext"

class MessagesService {
    async sendMessage(data) {
        const message = await dbContext.Message.create(data)

        await message.populate('creator chat')
        console.log('[Send Message]', message)
        return message
    }
    async getMessagesByChatId(chatId) {
        const messages = await dbContext.Message.find({ chatId: chatId }).populate('creator')
        return messages
    }

}

export const messagesService = new MessagesService()