<script setup>
import { computed, onMounted, ref } from 'vue';
import { loadState } from '../utils/Store.js';
import Login from './Login.vue';
// @ts-ignore
import CreatePostModal from './CreatePostModal.vue';
import { AppState } from '@/AppState.js';
import { AuthService } from '@/services/AuthService.js';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

// function toggleTheme() {
//   theme.value = theme.value == 'light' ? 'dark' : 'light'
//   document.documentElement.setAttribute('data-bs-theme', theme.value)
//   saveState('theme', theme.value)
// }

function toggleSideMenu() {
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu.style.width === "0px" || sideMenu.style.width === "") {
    sideMenu.style.width = "300px";
  } else {
    sideMenu.style.width = "0";
  }
}

const identity = computed(() => AppState.identity)

async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout()
}

const account = computed(() => AppState.account)
</script>

<template>
  <section id="desktopNav">
    <nav class="navbar navbar-expand-sm navbar-dark bg-warning px-3 container-fluid">
      <div class="col-md-3 p-3">
        <div class="d-flex align-self-center">
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
            <img alt="logo" src="../assets/img/forge.png" height="55"
              style="object-fit: cover; object-position: center;" />
            <div class="ms-3 align-self-center text-dark">
              <h1 class="m-0 p-0">Forge</h1>
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


      <div class="justify-content-end align-items-center col-md-3 d-flex">
        <div class="d-flex justify-content-between align-items-center">
          <!-- <button class="btn text-dark" @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
          <Icon :name="theme == 'light' ? 'weather-sunny' : 'weather-night'" />
        </button> -->

          <button data-bs-toggle="modal" data-bs-target="#createPostModal" class="btn btn-secondary text-primary"><i
              class="mdi mdi-plus-box fs-2"></i></button>
          <router-link :to="{ name: 'Messaging' }" class="btn text-dark body-text lighten-30 selectable text-uppercase">
            <i class="mdi mdi-chat-outline fs-2"></i>
          </router-link>
          <div class="btn">
            <Login />
          </div>
        </div>
      </div>
    </nav>
  </section>
  <section id="mobileNav">
    <nav class="align-content-center bg-warning px-3 container-fluid">
      <section class="row d-flex justify-space-between">
        <div class="col-6">
          <div class="d-flex align-self-center">
            <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
              <img alt="logo" src="../assets/img/forge.png" height="55"
                style="object-fit: cover; object-position: center;" />
              <div class="ms-3 mb-0 mt-2 align-self-center">
                <h2 class="text-dark">Forge</h2>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-6 justify-content-end d-flex text-dark text-end align-self-center">
          <div class="me-3 align-self-center">
            <i class="mdi mdi-menu fs-1" id="menuIcon" style="cursor: pointer;" @click="toggleSideMenu"></i>
          </div>
        </div>
      </section>
    </nav>

    <!-- Side Menu -->
    <div id="sideMenu" class="side-menu bg-secondary d-flex flex-column">
      <button class="close-btn align-self-end" @click="toggleSideMenu">&times;</button>

      <div class="dropdown">
        <div class="p-3">
          <div v-if="identity" type="button" id="menu-border" data-bs-toggle="dropdown" aria-expanded="false"
            class="selectable no-select header d-flex justify-content-between text-center py-3">

            <div v-if="identity" class="justify-content-center align-content-center bg-light ms-4"
              style="height: 75px; aspect-ratio: 1/1; border-radius: 50%;">
              <img v-if="identity" :src="account?.picture" alt=""
                style="height: 65px; aspect-ratio: 1/1; border-radius: 50%;">
            </div>

            <h1 v-if="identity" class="side-menu-item-text align-self-center text-center text-light me-5">{{
              account?.name }}
            </h1>

            <button class="btn selectable text-light bg-dark text-uppercase my-2 my-lg-0" @click="login"
              v-if="!identity">
              Login
            </button>
          </div>
          <div v-if="!identity" class="header mb-auto d-flex justify-content-center text-center">
            <button class="btn selectable text-light bg-dark text-uppercase my-2 my-lg-0 fs-5" @click="login">
              Login
            </button>
          </div>
          <div class="dropdown-menu p-0" aria-labelledby="authDropdown">
            <div class="list-group">
              <router-link :to="{ name: 'Account' }">
                <div @click="toggleSideMenu" class="list-group-item dropdown-item list-group-item-action">
                  Manage Account
                </div>
              </router-link>
              <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
                <div @click="toggleSideMenu">

                  <i class="mdi mdi-logout"></i>
                  logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Menu Content -->
      <div class="menu-items flex-grow-1 text-dark d-flex flex-column justify-content-center align-items-center">
        <router-link @click="toggleSideMenu" :to="{ name: 'Home' }" class="side-menu-item">Home</router-link>
        <router-link @click="toggleSideMenu" :to="{ name: 'Posts' }" class="side-menu-item">Posts</router-link>
        <router-link @click="toggleSideMenu" :to="{ name: 'About' }" class="side-menu-item">About Us</router-link>
        <router-link @click="toggleSideMenu" :to="{ name: 'Messaging' }" class="side-menu-item">
          Messaging <i class="mdi mdi-chat-outline"></i>
        </router-link>
      </div>

      <!-- Footer Section for Login -->
      <div class="footer mt-auto d-flex justify-content-center text-center py-3">
        <button @click="toggleSideMenu" data-bs-toggle="modal" data-bs-target="#createPostModal" type="button"
          class="button">
          <span class="button__text">Add Post</span>
          <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24"
              stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24"
              fill="none" class="svg">
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg></span>
        </button>
      </div>
    </div>



  </section>
  <CreatePostModal />


</template>

<style scoped>
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
}

.button,
.button__icon,
.button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(30px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 40px;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 30px;
  stroke: #fff;
}

.button:hover {
  background: #34974d;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #2e8644;
}

.button:active {
  border: 1px solid #2e8644;
}

.gradient-text {
  background: linear-gradient(to right, #142f32, #e3ffcc, #D9D9D9);
  background-clip: text;
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  animation: animate-gradient 2.5s linear infinite;
}

@keyframes animate-gradient {
  to {
    background-position: 200%;
  }
}

.dropdown-menu {
  background-color: #333;
}

#menu-border {
  border-radius: 8px;
  background-color: #142f32;
}

.side-menu {
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  right: 0;
  overflow-x: hidden;
  transition: 0.3s;
  padding-top: 60px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.side-menu-item {
  display: block;
  padding: 10px 20px;
  font-size: 18px;
  color: #333;
  text-decoration: none;
  transition: 0.3s;
}

.side-menu-item-text {
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 18px;
  display: block;
}

.side-menu-item:hover {
  background-color: #f1f1f1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 36px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff0000;
}

.gradient-text {
  background: linear-gradient(90deg, #5A6B5E, #C8F1B0);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
}

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

nav {
  height: 12dvh;
}

@media screen and (min-width: 768.1px) {
  #mobileNav {
    display: none !important
  }
}

@media screen and (max-width: 768px) {
  #desktopNav {
    display: none !important;
  }
}
</style>
