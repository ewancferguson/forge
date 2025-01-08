<script setup>
import { ref } from 'vue';



const Arrow = ref('mdi-arrow-right-bold-box');
const hideContact = ref(true)
function hideContactPage() {
  hideContact.value = !hideContact.value
  Arrow.value = Arrow.value === 'mdi-arrow-right-bold-box' ? 'mdi-arrow-left-bold-box ms-1' : 'mdi-arrow-right-bold-box';
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
          <div class="contact-card d-flex">
            <img class="img-fluid"
              src="https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000"
              alt="Creator's Name" />
            <div class="contact">
              <div class="d-flex">
                <p class="contact-name">Dino Man</p>
                <i class="mdi mdi-message-badge ms-2"></i>
              </div>
              <div class="contact-message">
                <p>
                  How is it going? How was your day?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <div @click="hideContactPage" class="closeMenuButton mb-3 sticky-bottom" style="position: absolute;">
        <i class="fs-1 mdi icon" :class="[Arrow]"></i>
      </div>
    </div>
  </section>
</template>

<style scoped>
#MessagingPage {
  --contacts-w: 250px;
  padding: 1em;
  margin: 1em;
  display: grid;
  grid-template-columns: var(--contacts-w) 1fr;
  grid-template-rows: 1fr;
  height: 84vh;
  border-radius: 2em;
  background-color: rgb(54, 79, 62);
  transition: all 0.4s ease;
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

.icon {
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
  max-width: 60%;
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
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  color: #666;
  width: 100%;
}
</style>