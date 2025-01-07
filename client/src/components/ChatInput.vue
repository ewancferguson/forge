<script setup>
import { ref } from 'vue';

const emit = defineEmits(['send']);
const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim()) {
        emit('send', newMessage.value);
        newMessage.value = '';
    }
};
</script>

<template>
    <div class="chat-input">
        <input type="text" v-model="newMessage" @keypress.enter="sendMessage" class="message-input"
            placeholder="Type your message..." />
        <button class="send-button" @click="sendMessage">
            <i class="mdi mdi-send"></i>
        </button>
    </div>
</template>

<style scoped>
.chat-input {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background: #D9D9D9;
}

.message-input {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
}

.send-button {
    padding: 0.75rem 1.5rem;
    background: var(--primary-color, #646cff);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
}

.send-button:hover {
    background: var(--primary-color-hover, #535bf2);
}
</style>