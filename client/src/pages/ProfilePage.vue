<script setup>
import { computed, onMounted, watch } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import Pop from '@/utils/Pop.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { postsService } from '@/services/PostsService.js';
import ListingCard from '@/components/ListingCard.vue';
import PostCard from '@/components/PostCard.vue';
import { followerService } from '@/services/FollowerService.js';
import { reviewsService } from '@/services/ReviewsService.js';
import ReviewCard from '@/components/ReviewCard.vue';
import AddReviewModal from '@/components/AddReviewModal.vue';

const account = computed(() => AppState.account)

const route = useRoute()

const listings = computed(() => AppState.profileListings)

// const profileListings = computed(() => AppState.profileListings)

const profile = computed(() => AppState.activeProfile)

const reviews = computed(() => AppState.profileReviews)

onMounted(() => {
  getProfileById()
  getListingsByProfileId()
  getFollowersByAccountId()
  getReviewsByProfileId()
})

watch(route, () => {
  getProfileById()
  getListingsByProfileId()
  getFollowersByAccountId()
})

async function getFollowersByAccountId() {
  try {
    const profileId = route.params.profileId
    await followerService.getFollowersByAccountId(profileId)

  }
  catch (error) {
    Pop.error(error);
    logger.log('getting followers by account Id', error)
  }
}

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('getting profile by id', error)
  }
}

async function getListingsByProfileId() {
  try {
    const profileId = route.params.profileId
    await profilesService.getListingsByProfileId(profileId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('getting listings by profile by id', error)
  }
}

async function getReviewsByProfileId() {
  try {
    const profileId = route.params.profileId
    await reviewsService.getReviewsByProfileId(profileId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('getting reviews by profile by id', error)
  }
}

async function createFollower() {
  try {
    const followingId = {followingId: route.params.profileId}
    await followerService.createFollower(followingId)
  }
  catch (error) {
    Pop.meow(error);
  }
}




</script>

<template>
  <div v-if="profile">
    <div class="container-fluid bg-grey">
      <img :src="profile.coverImg" alt="">
      <div class="d-flex justify-content-between align-items-center">
        <div class="ps-5 ms-5">
          <img class="profile-img" :src="profile.picture" alt="" />
          <h3 class="text-primary text-capitalize pt-3"> {{ profile.name }}</h3>
          <p>{{ profile.email }}</p>
          <button @click="createFollower()"
            class="btn btn-success fw-bold text-primary py-3 mb-5 rounded-4 outline me-4">+ FOLLOW</button>
          <button class="btn btn-success fw-bold text-primary py-3 mb-5 rounded-4 outline">CONTACT US</button>
          <button type="button" class="btn btn-success fw-bold text-primary py-3 mb-5 rounded-4 outline"
            data-bs-toggle="modal" data-bs-target="#reviewModal">
            Leave a Review
          </button>
          <AddReviewModal />
        </div>
        <div v-if="profile.facebook && profile.linkedIn && profile.website"
          class="card bg-green text-light p-3 pe-5 rounded-4 me-5 fw-bold">
          <a v-if="profile.facebook" class="pb-5 text-light" :href="profile.facebook">FACEBOOK</a>
          <a v-if="profile.linkedIn" class="pb-5 text-light" :href="profile.linkedIn">LINKEDIN</a>
          <a v-if="profile.website" class="text-light" :href="profile.website">COMPANY SITE</a>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <h3 class="text-success p-5 mt-5">Recent Posts</h3>
          <div>
            <div class="mb-4" v-for="listing in listings" v-bind:key="listing.id">
              <ListingCard :listing="listing" />
            </div>
            <div v-if="!listings" class="text-center">
              <h3>Loading Posts... <i class="mdi mdi-loading mdi-spin"></i></h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <h3 class="text-success p-5 mt-5">Reviews</h3>
          <div v-for="review in reviews" :key="review.id">
            <ReviewCard :review-prop="review" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-light mt-5 text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>

<style scoped lang="scss">
.profile-img {
  border-radius: 50%;
  height: 150px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.bg-grey {
  background-color: #D9D9D9;
}

.bg-green {
  background-color: #194348;
}
</style>
