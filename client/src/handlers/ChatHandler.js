import { AppState } from "@/AppState.js";
import { Chat } from "@/models/Chat.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";
import { ref } from "vue";

class ChatHandler extends SocketHandler {
    constructor() {
        super()
        this.userId = ref(null) // Make userId a reactive property of the class
        this.on('authenticated', this.storeUser)
        this.on('CREATED_CHAT', this.onCreatedChat)
    }

    storeUser(payload) {
        this.userId.value = payload.id
        this.emit('JOIN_ROOM', 'MESSAGE_NOTIFICATIONS');
    }

    onCreatedChat(payload) {
        const chat = new Chat(payload)
        if (chat.creatorId == this.userId.value || chat.participantInfo.id == this.userId.value) {
            Pop.toast('You Have Been Added To A Chat!')
        }
        AppState.Chats.push(chat)
    }
}

export const chatHandler = new ChatHandler()