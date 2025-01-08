<script setup>
import { ref } from 'vue';



const Arrow = ref('mdi-arrow-left-bold-box');
const hideContact = ref(false)
function hideContactPage() {
  hideContact.value = !hideContact.value
  Arrow.value = Arrow.value === 'mdi-arrow-left-bold-box' ? 'mdi-arrow-right-bold-box' : 'mdi-arrow-left-bold-box';
}
</script>

<template>
  <section id="MessagingPage" :class="{ 'hide-contacts': hideContact }">
    <div class="contact-container">
      <div class="contact-search">
        <input type="text" placeholder="Search contacts..." />
        <h4 class="selectable m-0">
          <i class="mdi mdi-account-search"></i>
        </h4>
      </div>
      <div class="chat-bubbles">

      </div>
    </div>
    <div class="chat-container">
      <button @click="hideContactPage" class="btn btn-success mt-5 sticky-bottom" style="position: absolute;">
        <i class="fs-3 mdi icon" :class="[Arrow]"></i>
      </button>
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
  background-color: white;
  transition: all 0.4s ease;
}

#MessagingPage.hide-contacts {
  --contacts-w: 0px;
}

#MessagingPage>* {
  width: 100%;
}

.contact-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  margin: 0 auto;
  color: #666;
  width: 100%;
}

.contact-search {
  position: sticky;
  margin-bottom: auto;
  padding: 1em;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 2em 2em 0px 0px;
  padding-top: 0px;
  height: 20%;
}

.contact-search input {
  background-color: #eee;
  padding: 0.5em;
  border: none;
  outline: none;
  border-radius: 10px 0 0 10px;
}

.contact-search h4 {
  margin: 0;
  color: #666;
  background: #eee;
  border-radius: 0 10px 10px 0;
}

.chat-bubbles {
  padding: 1em;
  align-items: center;
  background: #f8f8f8;
  overflow-y: hidden;
  border-radius: 0px 0px 2em 2em;
  margin: 0px;
}



.chat-container {
  justify-content: baseline;
  flex-direction: center;
  overflow-y: auto;
  margin: 0 auto;
}
</style>