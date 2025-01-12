import { dbContext } from "../db/DbContext"
import { socketProvider } from "../SocketProvider"
import { Forbidden } from "../utils/Errors"

class MessagesService {
    async deleteMessage(messageId) {
        const message = await dbContext.Message.findById(messageId)

        if (message == null) {
            throw new Error(`invalid Message ID: ${messageId}`)
        }
        await dbContext.Message.deleteOne()

        return 'Successfully deleted the message'
    }
    async sendMessage(data) {

        if (data.body == '') {
            return "Cannot Send Empty Messages!"
        }
        const message = await dbContext.Message.create(data)

        await message.populate('creator chat')


        socketProvider.messageRoom(message.chatId.toString(), 'CREATED_MESSAGE', message)
        socketProvider.messageRoom('MESSAGE_NOTIFICATIONS', 'NEW_MESSAGE', message)

        return message
    }
    async getMessagesByChatId(chatId) {
        const messages = await dbContext.Message.find({ chatId: chatId }).populate('creator').sort({ createdAt: 1 });
        return messages
    }

}

export const messagesService = new MessagesService()