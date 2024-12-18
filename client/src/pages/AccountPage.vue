<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="container-fluid bg-grey">
    <div v-if="account">
      <div>
        <!-- <img :src="account.coverImg" alt=""> -->
        <img class="profile-img" :src="account.picture" alt="" />
        <h1 class="text-primary"> {{ account.name }}</h1>
        <!-- <p>{{ account. }}</p> -->
        <p>{{ account.email }}</p>
        <button class="btn btn-success fw-bold text-primary">EDIT ACCOUNT</button>
      </div>
    </div>
    <div v-else>
      <h1 class="text-light mt-5">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 150px;
}

.profile-img {
  border-radius: 100em;
}

.bg-grey {
  background-color: #D9D9D9;
}
</style>
