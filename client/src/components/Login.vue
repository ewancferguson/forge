<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';

const identity = computed(() => AppState.identity)
const account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout()
}

</script>

<template>
  <span class="navbar-text">
    <button class="btn selectable text-light bg-dark text-uppercase my-2 my-lg-0" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="bg-dark selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account?.picture || identity?.picture">
            <img :src="account?.picture || identity?.picture" alt="account photo" height="40" class="rounded-0" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link v-if="account" :to="{ name: 'Profile', params: { profileId: account.id } }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style lang="scss" scoped></style>
