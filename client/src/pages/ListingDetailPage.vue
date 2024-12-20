<script setup>
import { AppState } from '@/AppState';
import { listingsService } from '@/services/ListingsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const listings = computed(() => AppState.activeListing)

onMounted(() => {
  getListingById()
})

watch(route, () => {
  getListingById()
})

async function getListingById() {
  try {
    const listingId = route.params.listingId
    await listingsService.getListingById(listingId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('getting listing by id', error)
  }
}
</script>


<template>
  <div v-if="listings" class="container mt-5">
    <div class="bg-green shadow rounded-4 pb-2">
      <div class="d-flex card-header text-light outline outline-primary rounded-top-4 p-2">
        <img class="profile-img m-2" :src="listings.creator.picture" alt="">
        <div class="align-items-space-between">
          <h3>{{ listings.creator.name }}</h3>
          <p class="text-secondary">{{ listings.createdAt.toLocaleTimeString() }}</p>
        </div>
      </div>
      <div class="card mx-5 my-4 ps-2 pt-2">
        <div class="mb-3">
          <strong>Type:</strong>
          <span id="listing-type" class="ps-1 text-capitalize">{{ listings.type }}</span>
        </div>
        <div class="mb-3">
          <strong>Location:</strong>
          <span id="listing-location" class="ps-1">{{ listings.location }}</span>
        </div>
        <div class="mb-3">
          <strong>Body:</strong>
          <p id="listing-body">
            {{ listings.body }}
          </p>
        </div>
        <div class="mb-3">
          <strong v-if="listings.pictures > 1">Images:</strong>
          <strong v-else>Image:</strong>
          <img id="listing-pictures" :src="listings.pictures" alt="Listing Image" class="img-fluid rounded post-img">
        </div>
        <div class="mb-3">
          <strong>Budget Range:</strong>
          <span id="listing-budget" class="ps-1">${{ listings.minBudget }} - ${{ listings.maxBudget }}</span>
        </div>
        <div class="mb-3">
          <strong>Status:</strong>
          <span id="listing-status" class="badge bg-warning text-primary ms-1">{{ listings.isResolved }}</span>
        </div>
        <div class="mb-3">
          <strong>Created At:</strong>
          <span id="listing-created-at" class="ps-1">{{ listings.createdAt.toDateString() }}</span>
        </div>
        <div class="mb-3">
          <strong>Likes:</strong>
          <span id="listing-likes" class="ps-1">{{ listings.likeCount }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-end pb-2">
          <button v-if="listings.creator" class="btn btn-primary me-2">Message Us <i class="mdi mdi-chat"></i></button>
          <div class="justify-content-end">
            <button v-if="!listings.creator" class="btn btn-danger me-2" id="delete-post">Delete</button>
            <button v-if="!listings.creator" class="btn btn-success me-2" id="mark-resolved">Mark as Resolved</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-light mt-5 text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  border-radius: 100em;
  max-height: 4em;
}

.post-img {
  max-height: 40em;

}

.bg-green {
  background-color: #194348;
}

.corner {
  border-radius: 5em;
}
</style>