<script setup>
import { AppState } from '@/AppState';
import EditAccountModal from '@/components/EditAccountModal.vue';
import PostCard from '@/components/PostCard.vue';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const listings = computed(() => AppState.listings)

</script>

<template>
  <div class="container-fluid bg-grey">
    <div v-if="account">
      <img class="cover-img" :src="account.coverImg" alt="">
      <div class="d-flex justify-content-between align-items-center">
        <img :src="account.coverImg" alt="">
        <div class="ps-5 ms-5">
          <img class="profile-img" :src="account.picture" alt="" />
          <h3 class="text-primary text-capitalize pt-3"> {{ account.name }}</h3>
          <p>{{ account.email }}</p>
          <button data-bs-toggle="modal" data-bs-target="#editAccountModal"
            class="btn btn-success fw-bold text-primary py-3 mb-5 rounded-4 outline">EDIT ACCOUNT</button>
        </div>
        <div class="card bg-green text-light p-3 pe-5 rounded-4 me-5 fw-bold">
          <a class="pb-5 text-light" :href="account.facebook">FACEBOOK</a>
          <a class="pb-5 text-light" :href="account.linkedIn">LINKEDIN</a>
          <a class="text-light" :href="account.website">COMPANY SITE</a>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-light mt-5">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <h3 class="text-success p-5 mt-5">Recent Posts</h3>
        <div v-for="listing in listings" :key="listing.id">
          <PostCard :listing="listing" />
        </div>
      </div>
      <div class="col-md-3">
        <h3 class="text-success p-5 mt-5">Reviews</h3>
      </div>
    </div>
  </div>
  <EditAccountModal />
</template>

<style scoped lang="scss">
img {
  max-width: 150px;
}

.profile-img {
  border-radius: 100em;
}

.cover-img {
  min-height: 10em;
}

.bg-grey {
  background-color: #D9D9D9;
}

.bg-green {
  background-color: #194348;
}
</style>
