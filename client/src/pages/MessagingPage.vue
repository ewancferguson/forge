<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { connectSocket, sendMessage, onMessage, disconnectSocket } from '../socket'; // adjust the import path

const messages = ref([]);
const newMessage = ref('');
let socket;  // Declare the socket variable here

onMounted(() => {
  socket = connectSocket(); // Store socket instance

  onMessage((msg) => {
    messages.value.push({ text: msg, self: false });
  });
});

// Send a message to the WebSocket server
const sendChatMessage = () => {
  if (newMessage.value.trim()) {
    sendMessage(newMessage.value); // Use sendMessage function from socket.js
    messages.value.push({ text: newMessage.value, self: true });
    newMessage.value = ''; // Clear the input field
  }
};

// Disconnect from WebSocket when component is destroyed
onBeforeUnmount(() => {
  disconnectSocket(); // Clean up the socket connection
});
</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-8 pt-3">
        <!-- Chat Messages -->
        <div class="chat-messages">
          <div v-for="(msg, index) in messages" :key="index" class="message">
            <div :class="{ 'text-end': msg.self }" class="message-content">
              <p class="text-light fs-5">{{ msg.text }}</p>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="d-flex mb-3 sticky-bottom ms-5 ps-5 my-3 pb-3">
          <input type="text" class="form-control bg-green text-success border-green rounded-end-0" v-model="newMessage"
            placeholder="Your Message" />
          <button class="btn bg-green text-success rounded-start-0" @click="sendChatMessage">
            <i class="mdi mdi-send"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.chat-messages {
  max-height: 400px;
  overflow-y: auto;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  margin-bottom: 10px;
}

.text-end {
  text-align: end;
}
</style>
