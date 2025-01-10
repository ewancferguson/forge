<script setup>
import { AppState } from '@/AppState';
import MessageCard from '@/components/MessageCard.vue';
import MyMessageCard from '@/components/MyMessageCard.vue';
import { chatsService } from '@/services/ChatsService';
import { messagesService } from '@/services/MessagesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

onMounted(() => {
  scrollToBottom();
  checkAccount()
  initialMessage.value = true
});

onUnmounted(() => {
  AppState.Messages = []
})

const isAccount = ref(false)
const contacts = computed(() => AppState.Chats)
const account = computed(() => AppState.account)
const messages = computed(() => AppState.Messages)


async function checkAccount() {
  const maxRetries = 10;
  let retries = 0;

  while (!account.value && retries < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    retries++;
  }

  if (account.value) {
    isAccount.value = true;
    await getAllContacts();
  } else {
    logger.error("Account not available after retries");
    Pop.error('Please Sign In To Get Messages')
  }
}

async function getAllContacts() {
  const userId = account?.value.id

  await chatsService.getAllContacts(userId)
}



const selectedMessageId = ref(null);

const initialMessage = ref(true)
const loading = ref(true)
const noMessages = ref(false);

async function selectMessage(id) {
  selectedMessageId.value = id;
  conversation.value = true;
  loading.value = true;
  noMessages.value = false
  try {
    const hasMessages = await messagesService.getMessages(id);
    scrollToBottom()
    noMessages.value = !hasMessages;
    if (newMessage.value === id) {
      newMessage.value = null;
    }
  } catch (error) {
    error(error)
  } finally {
    loading.value = false;
    initialMessage.value = false
  }
}

const newMessage = ref(null);
const showNotification = ref(false);

watch(newMessage, (newVal) => {
  showNotification.value = !!newVal;
});

const chatRef = ref(null);




const scrollToBottom = () => {
  nextTick(() => {
    if (chatRef.value) {
      chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }
  });
};

watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);


const conversation = ref(false);
const Arrow = ref('mdi-arrow-left-bold');
const hideContact = ref(false);

function hideContactPage() {
  hideContact.value = !hideContact.value;
  Arrow.value =
    Arrow.value === 'mdi-arrow-left-bold'
      ? 'mdi-arrow-right-bold ms-1'
      : 'mdi-arrow-left-bold';
}

const editableFormData = ref({
  body: '',
});

async function handleSendMessage() {
  if (!editableFormData.value.body.trim()) {
    alert('Message cannot be empty!');
    return;
  }

  if (!selectedMessageId.value) {
    alert('No chat selected!');
    return;
  }


  const data = {
    body: editableFormData.value.body,
    chatId: selectedMessageId.value,
  };

  await messagesService.sendMessage(data)

  editableFormData.value.body = '';
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
            :class="{ selectedMessage: selectedMessageId === contact?.id }" @click="selectMessage(contact.id)">
            <!-- Determine whether to use participant or creator info -->
            <img class="img-fluid"
              :src="contact?.participantInfo.id !== account?.id ? contact?.participantInfo.picture : contact?.creator.picture"
              alt="Creator's Name" />
            <div class="contact">
              <div class="d-flex">
                <p class="contact-name">
                  {{ contact?.participantInfo.id !== account?.id ? contact?.participantInfo.name : contact?.creator.name
                  }}
                </p>
                <i v-if="newMessage === contact?.id" class="mdi mdi-message-badge ms-2"></i>
              </div>
              <div class="contact-message">
                <p v-if="contact?.messageHistory.length != 0">
                  {{ contact?.messageHistory[0] }}
                </p>
                <p v-else>
                  Start A Conversation Now! ....
                </p>
              </div>
            </div>
          </div>
          <div class="ms-auto text-end mb-auto mt-0">
            <p class=" selectable m-0 p-0 fs-4"><i class="mdi mdi-dots-horizontal"></i></p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <div class="no-chat-content p-4" v-if="initialMessage">
        <h1>
          Select a conversation! If no conversations reach out to businesses/users through there profile page!
        </h1>
      </div>
      <div class="no-chat-content p-4" v-if="!conversation && !initialMessage">
        <h1>
          Loading Messages <i class="mdi mdi-loading mdi-spin"></i>
        </h1>
      </div>
      <section v-else ref="chatRef" class="chat-content">
        <div class="fw-bold no-chat-content d-flex align-items-center text-center justify-content-center"
          v-if="noMessages">
          <h1>No Messages With This User, Send A Message To Start The Conversation!</h1>
        </div>
        <div class="fw-bold no-chat-content d-flex align-items-center text-center justify-content-center"
          v-if="loading === true && !initialMessage">
          <h1>Loading Messages <i class="mdi mdi-loading mdi-spin"></i></h1>
        </div>
        <div v-for="message in messages" :key="message.id">
          <MessageCard v-if="message.creatorId !== account?.id" :messages="message" />
          <MyMessageCard v-else :messages="message" />
        </div>
      </section>
      <div v-if="conversation" class="chat-input sticky-bottom">
        <div @click="hideContactPage" class="closeMenuButton"
          style="justify-self: flex-start; display: flex; margin: 0px; padding: 0px; font-size: 64px;">
          <i class="btn btn-transparent mdi icon" :class="[Arrow]"></i>
        </div>
        <form class="inputBox d-flex" @submit.prevent="handleSendMessage">
          <input v-model="editableFormData.body" type="text" class="messageInput form-control"
            placeholder="Start Typing..." />
          <div @click="handleSendMessage"
            style="justify-self: flex-end; display: flex; margin: 0px; padding: 0px; font-size: 64px;">
            <i class="btn btn-success mdi icon text-black mdi-send" style="border-radius: 0 0.45em 0.45em 0;"></i>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.messageInput {
  width: 100%;
}

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
  width: 100%;
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
  overflow-y: scroll;
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
  overflow-y: hidden;
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
  overflow-y: hidden;
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