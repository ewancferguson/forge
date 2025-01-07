<script setup>
defineProps({
    message: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div :class="{ 'text-end': message.self }" class="message-content">
        <div class="message-bubble">
            <div class="user-info">
                <img :src="user.picture" :alt="user.name" class="user-avatar" />
                <div class="user-details">
                    <span class="user-name">{{ user.name }}</span>
                </div>
            </div>
            <p class="message-text">{{ message.content }}</p>
        </div>
    </div>
</template>

<style scoped>
.message-content {
    margin: 1rem 0;
    color: black;
}

.message-bubble {
    display: inline-block;
    max-width: 75%;
    padding: 1rem;
    background: var(--chat-bubble-bg, #f0f0f0);
    border-radius: 1rem;
}

.message-text {
    margin-top: 0.5rem;
    word-break: break-word;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-avatar {
    height: 3rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}

.user-details {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
}

.user-name {
    font-weight: 600;
    font-size: 16px;
    text-decoration: underline;
}

.user-email {
    color: var(--text-muted, #666);
}
</style>