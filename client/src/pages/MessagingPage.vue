<script setup>
import MessageCard from '@/components/MessageCard.vue';
import MyMessageCard from '@/components/MyMessageCard.vue';
import { logger } from '@/utils/Logger';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

const contacts = ref([
  {
    id: 1,
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    text: 'hey how is it going',
    name: 'Dino Man'
  },
  {
    id: 2,
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    text: 'hey how is it going',
    name: 'Dino Women'
  },
  {
    id: 3,
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    text: 'hey how is it going',
    name: 'Not A Dino'
  },
  {
    id: 4,
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    text: 'hey how is it going what you up too',
    name: 'Dino Dino'
  },
])
const messages = ref([
  {
    id: 1,
    sender: 'me', // Sender can be 'me' or 'other'
    body: 'Hey, how are you doing?',
    timeStamp: formatTimeStamp(new Date('2025-01-09T14:00:00'))
  },
  {
    id: 2,
    sender: 'other',
    body: 'I’m good, thanks! What about you?',
    timeStamp: formatTimeStamp(new Date('2025-01-09T14:01:00'))
  },
  {
    id: 3,
    sender: 'me',
    body: 'I’m great! Are you free later to catch up?',
    timeStamp: formatTimeStamp(new Date('2025-01-09T14:02:00'))
  },
  {
    id: 4,
    sender: 'other',
    body: 'Sure, let’s meet at the coffee shop at 5.',
    timeStamp: formatTimeStamp(new Date('2025-01-09T14:03:00'))
  },
  {
    id: 5,
    sender: 'me',
    body: 'Perfect! See you there.',
    timeStamp: formatTimeStamp(new Date('2025-01-09T14:04:00'))
  }
]);

function formatTimeStamp(date) {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${month} ${day}, ${time}`;
}

const sortedMessages = computed(() =>
  [...messages.value].sort(
    (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
  )
);

logger.log(sortedMessages)
const selectedMessageId = ref(null);

function selectMessage(id) {
  selectedMessageId.value = id;

  if (newMessage.value === id) {
    newMessage.value = null;
  }
}

const newMessage = ref(null);
const showNotification = ref(false);

watch(newMessage, (newVal) => {
  showNotification.value = !!newVal;
});

setTimeout(() => {
  newMessage.value = '3'; // Simulate new message with ID '3'
}, 2000);


const chatRef = ref(null);

onMounted(() => {
  scrollToBottom();
});

function scrollToBottom() {
  nextTick(() => {
    if (chatRef.value) {
      chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }
  });
}

const conversation = ref(true);
const Arrow = ref('mdi-arrow-left-bold');
const hideContact = ref(false);

function hideContactPage() {
  hideContact.value = !hideContact.value;
  Arrow.value =
    Arrow.value === 'mdi-arrow-left-bold'
      ? 'mdi-arrow-right-bold ms-1'
      : 'mdi-arrow-left-bold';
}
</script>


<template>
  <section id="MessagingPage" :class="{ 'hide-contacts': hideContact }">
    <div class="contact-container">
      <div class="contact-search">
        <input type="text" placeholder="Search contacts..." />
        <i class="mdi fs-3 btn mdi-account-search"></i>
      </div>
      <div class="chat-bubbles">
        <div class="contact-info">
          <div v-for="contact in contacts" :key="contact.id" class="contact-card d-flex"
            :class="{ selectedMessage: selectedMessageId === contact.id }" @click="selectMessage(contact.id)">
            <img class="img-fluid" :src="contact.img" alt="Creator's Name" />
            <div class="contact">
              <div class="d-flex">
                <p class="contact-name">{{ contact.name }}</p>
                <i v-if="newMessage === contact.id" class="mdi mdi-message-badge ms-2"></i>
              </div>
              <div class="contact-message">
                <p>
                  {{ contact.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <div class="no-chat-content" v-if="!conversation">
        <h1>
          Select a conversation to begin chatting
        </h1>
      </div>
      <section ref="chatRef" class="chat-content">
        <div v-for="message in sortedMessages" :key="message.id">
          <MessageCard v-if="message.sender === 'other'" :messages="message" />
          <MyMessageCard v-else :messages="message" />
        </div>
      </section>
      <div class="chat-input sticky-bottom">
        <div @click="hideContactPage" class="closeMenuButton"
          style="justify-self: flex-start; display: flex; margin: 0px; padding: 0px; font-size: 64px;">
          <i class="btn btn-transparent mdi icon" :class="[Arrow]"></i>
        </div>
        <input type="text" class="inputBox form-control" placeholder="Start Typing..." />
        <div style="justify-self: flex-end; display: flex; margin: 0px; padding: 0px; font-size: 64px;">
          <i class="btn btn-success mdi icon text-black mdi-send" style="border-radius: 0 0.45em 0.45em 0;"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#MessagingPage {
  --contacts-w: 375px;
  padding: 1em;
  margin: 1em;
  display: grid;
  grid-template-columns: var(--contacts-w) 1fr;
  grid-template-rows: 1fr;
  height: 83vh;
  border-radius: 2em;
  transition: all 0.4s ease;
}


.closeMenuButton {
  margin: 0px;
  padding: 0px;
  margin-bottom: 1em;
}

.closeMenuButton:hover {
  cursor: pointer;
}

#MessagingPage.hide-contacts {
  --contacts-w: 0px;
}

#MessagingPage>* {
  width: 100%;
}

.inputBox {
  height: 90%;
  border: none;
  margin: 0px;
  border-radius: 0.45em 0 0 0.45em;
}

.icon {
  font-size: 24px;
  height: 100%;
  color: white;
}

.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  color: #666;
  width: 100%;
}

.contact-search {
  position: sticky;
  top: 0;
  margin-top: 0px;
  margin-bottom: auto;
  padding: 1em 1em 0;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 2em 2em 0 0;
  height: 20%;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.contact-search input {
  flex: 1;
  background-color: #eee;
  padding: 0.5em 1em;
  border: none;
  outline: none;
  border-radius: 10px 0 0 10px;
  font-size: 1rem;
  width: 100%;
}

.contact-search h4 {
  margin: 0;
  color: #666;
  background-color: #eee;
  border-radius: 0 10px 10px 0;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;
}

.chat-bubbles {
  padding: 0.75em;
  align-items: center;
  background: #f8f8f8;
  overflow-y: hidden;
  border-radius: 0px 0px 2em 2em;
  margin: 0px;
  width: 100%;
  height: 80%;
  overflow-x: hidden;
}

.contact-card {
  display: flex;
  align-items: center;
  padding: 0.8em;
  margin: 0.8em 0;
  border-radius: 1em;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.selectedMessage {
  background-color: #73e985;
  border: 2px solid rgba(13, 107, 54, 0.958);
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0.8em;
  margin: 0.8em 0;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}


.selectedMessage:hover {
  transform: scale(1.03);
  box-shadow: 2px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.contact-card:hover {
  transform: scale(1.03);
  box-shadow: 2px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.contact-card img {
  height: 55px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-weight: bold;
  font-size: 1rem;
  margin: 0 0 0.3em;
  color: #333;
}

.contact-message {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  color: #666;
}

.contact-message p {
  margin: 0;
  font-size: 0.8rem;
}

.contact {
  margin-left: 0.8em;
}

.chat-container {
  overflow-x: hidden;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
  border-radius: 2em;
  padding: 0.5em;
}

.no-chat-content {
  height: 90%;
  align-content: center;
  color: white;
  text-align: center;
}

.chat-content {
  overflow-y: scroll;
  height: 90%;
  color: white;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.chat-content::-webkit-scrollbar {
  display: none;
}


.chat-input {
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>