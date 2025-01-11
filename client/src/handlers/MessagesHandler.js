import { AppState } from "@/AppState.js";
import { Message } from "@/models/Messages.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class MessagesHandler extends SocketHandler {
    constructor() {
        super()
        this.on('CREATED_MESSAGE', this.onCreatedMessage)
    }
    onCreatedMessage(payload) {
        const message = new Message(payload)
        AppState.Messages.push(message)
    }
}


export const messagesHandler = new MessagesHandler()