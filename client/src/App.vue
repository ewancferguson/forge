<script setup>
import { computed, onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { messagesHandler } from './handlers/MessagesHandler';
import { Identity } from '@bcwdev/auth0provider-client';
import Pop from './utils/Pop';
import { AppState } from './AppState';

const identity = ref(Identity)
const account = computed(() => AppState.account)


onMounted(() => {
  if (identity.value) {
    listenForNotifications();
  }
});

function listenForNotifications() {
  messagesHandler.on('NEW_MESSAGE', (message) => {
    if (message.creatorId == account.value.id) {
      return
    }
    Pop.toast(`${message.creator.name} Sent You A Message: ${message.body}`)
  });
}

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

</style>
