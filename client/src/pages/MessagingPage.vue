<script setup>
import { AppState } from '@/AppState';
import MessageCard from '@/components/MessageCard.vue';
import MyMessageCard from '@/components/MyMessageCard.vue';
import { messagesHandler } from '@/handlers/MessagesHandler';
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
  leaveMessageRoom()
})

const isAccount = ref(false)
const account = computed(() => AppState.account)
const messages = computed(() => AppState.Messages)


async function checkAccount() {
  const maxRetries = 15;
  let retries = 0;

  while (!account.value && retries < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, 750));
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

async function selectMessage(id) {
  try {
    if (selectedMessageId.value != id) {
      leaveMessageRoom()
    }

    if (selectedMessageId.value == id) {
      return
    }

    selectedMessageId.value = id;
    joinMessageRoom()



    conversation.value = true;
    loading.value = true;

    await messagesService.getMessages(id);
    scrollToBottom()


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

function joinMessageRoom() {
  messagesHandler.emit('JOIN_ROOM', selectedMessageId.value)
}
function leaveMessageRoom() {
  messagesHandler.emit('LEAVE_ROOM', selectedMessageId.value)
}

const searchQueryResults = ref("");

watch(
  searchQueryResults,
  (newValue, oldValue) => {
    logger.log(`Contacts search query changed from "${oldValue}" to "${newValue}"`);
    searchQueryResults.value = newValue
  }
);

const filteredChats = computed(() => {
  if (!searchQueryResults.value.trim()) {
    return AppState.Chats;
  }

  const query = searchQueryResults.value.toLowerCase();

  return AppState.Chats.filter(chat => {
    if (chat.participantInfo?.name) {
      return chat.participantInfo?.name.toLowerCase().startsWith(query);
    }
    return "No Contacts Match That Search!";
  });
});


const trashId = ref(null)
function hideMenu(id) {
  if (trashId.value === id) {
    trashId.value = null
    return
  } else {
    trashId.value = id
  }
}


async function deleteChat(id) {
  await chatsService.deleteChat(id)
}

</script>


<template>
  <section id="MessagingPage" :class="{ 'hide-contacts': hideContact }">
    <div class="contact-container">
      <form class="contact-search">
        <input type="text" v-model="searchQueryResults" placeholder="Search contacts..." />
      </form>
      <div class="chat-bubbles">
        <div class="contact-info">
          <div v-for="contact in filteredChats" :key="contact.id" @click="selectMessage(contact.id)">
            <!-- Determine whether to use participant or creator info -->
            <div class="d-flex contact-card" :class="{ selectedMessage: selectedMessageId === contact?.id }">
              <img class="img-fluid"
                :src="contact?.participantInfo.id !== account?.id ? contact?.participantInfo.picture : contact?.creator.picture"
                alt="Creator's Name" />
              <div class="contact">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex">
                    <p class="contact-name m-0 p-0">
                      {{ contact?.participantInfo.id !== account?.id ? contact?.participantInfo.name :
                        contact?.creator.name
                      }}
                      <i v-if="newMessage === contact?.id" class="mdi mdi-message-badge ms-2"></i>
                    </p>
                  </div>
                  <div class="text-end d-flex align-items-center">
                    <div class="me-2">
                      <i @click="deleteChat(contact?.id)" :class="{ hideTrashButton: trashId != contact?.id }"
                        class="selectable mdi m-0 p-0 fs-4 mdi-trash-can"></i>
                    </div>
                    <label class="hamburger">
                      <input @click="hideMenu(contact?.id)" type="checkbox">
                      <svg viewBox="0 0 32 32">
                        <path class="line line-top-bottom"
                          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
                        </path>
                        <path class="line" d="M7 16 27 16"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="contact-message">
                  <p class="p-0 m-0" v-if="contact?.messageHistory.length != 0">
                    {{ contact?.messageHistory[0] }}
                  </p>
                  <p class="p-0 m-0" v-else>
                    Start A Conversation Now! ....
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!filteredChats">
            <h3>No Results For That Search</h3>
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
      <section v-else ref="chatRef" class="chat-content">
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
.hamburger {
  cursor: pointer;
}

.hideTrashButton {
  display: none !important;
}

.hamburger input {
  display: none;
}

.hamburger svg {
  height: 2em;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  fill: none;
  stroke: #666;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line-top-bottom {
  stroke-dasharray: 12 63;
}

.hamburger input:checked+svg {
  transform: rotate(-45deg);
}

.hamburger input:checked+svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}

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

.messageMenu {
  background-color: #ffffff;
  border: 2px solid rgb(124, 103, 103);
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
  max-width: 75%;
  color: #666;
}

.contact-message p {
  margin: 0;
  font-size: 0.8rem;
}

.contact {
  margin-left: 0.8em;
  width: 100%;
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