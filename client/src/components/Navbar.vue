<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-warning px-3 container-fluid">
    <div class="col-md-3 p-3">
      <div class="d-flex align-self-center">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="p-2">
            <img alt="logo" src="../assets/img/forge.png" height="55"
              style="object-fit: cover; object-position: center;" />
          </div>
          <div class="ms-3 mb-0 mt-2 align-self-center text-dark">
            <h2>Forge</h2>
          </div>
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    </div>

    <div class="col-md-6 navbar-nav justify-content-center" id="navbarText">
      <div class="m-1">
        <router-link :to="{ name: 'Home' }" class="btn text-dark lighten-30 body-text selectable text-uppercase">
          Home
        </router-link>
      </div>
      <div class="m-1">
        <router-link :to="{ name: 'Posts' }" class="btn text-dark body-text lighten-30 selectable text-uppercase">
          Posts
        </router-link>
      </div>
      <div class="m-1">
        <router-link :to="{ name: 'About' }" class="btn text-dark body-text lighten-30 selectable text-uppercase">
          About Us
        </router-link>
      </div>
    </div>


    <div class="justify-content-end col-md-3 d-flex">
      <button class="btn text-dark" @click="toggleTheme"
        :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
        <Icon :name="theme == 'light' ? 'weather-sunny' : 'weather-night'" />
      </button>

      <Login />
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-info);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
