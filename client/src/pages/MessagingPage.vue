<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { connectSocket, sendMessage, onMessage, disconnectSocket } from '../socket'
import { Message } from '../models/Messages'
import ChatMessage from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'
import { logger } from '@/utils/Logger'
import { AppState } from '@/AppState'

const account = computed(() => AppState.account)
const messages = ref([]);
const currentUser = ref({
  id: account?.value.id,
  name: account?.value.name,
  email: account?.value.email,
  picture: account?.value.picture
});

const otherUser = computed(() => AppState.MessageProfile)

let socket

onMounted(() => {
  socket = connectSocket()

  onMessage((msg) => {
    const newMessage = new Message({
      name: otherUser.value.name,
      picture: otherUser.value.picture,
      content: msg,
      userId: otherUser.value.id,
      self: false
    })
    messages.value.push(newMessage)
  })
})

const handleSendMessage = (text) => {
  const newMessage = new Message({
    name: currentUser.value.name,
    picture: currentUser.value.picture,
    content: text,
    userId: currentUser.value.id,
    self: true
  })

  sendMessage(text)
  logger.log('New Message', newMessage)
  messages.value.push(newMessage)
}

onBeforeUnmount(() => {
  disconnectSocket()
})

const getUserForMessage = (message) => {
  return message.userId === currentUser.value.id ? currentUser.value : otherUser.value
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-messages">
      <ChatMessage v-for="message in messages" :key="message.id" :message="message"
        :user="getUserForMessage(message)" />
    </div>
    <ChatInput @send="handleSendMessage" />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

:deep(.message-content) {
  margin-bottom: 1rem;
}

:deep(.message-content.text-end .message-bubble) {
  background: var(--primary-color, #646cff);
  color: white;
}

:deep(.message-content.text-end .user-email) {
  color: rgba(255, 255, 255, 0.8);
}
</style>