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
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h3>Listing Details</h3>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <strong>Type:</strong>
          <span id="listing-type">Construction</span>
        </div>
        <div class="mb-3">
          <strong>Location:</strong>
          <span id="listing-location">60a76bf1b3c7e1a2d8b2e222</span>
        </div>
        <div class="mb-3">
          <strong>Body:</strong>
          <p id="listing-body">
            Seeking experienced subcontractors for steel structure erection in a factory.
          </p>
        </div>
        <div class="mb-3">
          <strong>Pictures:</strong>
          <img id="listing-pictures" src="" alt="Listing Image" class="img-fluid rounded">
        </div>
        <div class="mb-3">
          <strong>Budget Range:</strong>
          <span id="listing-budget">$15,000 - $35,000</span>
        </div>
        <div class="mb-3">
          <strong>Status:</strong>
          <span id="listing-status" class="badge bg-warning">Unresolved</span>
        </div>
        <div class="mb-3">
          <strong>Created At:</strong>
          <span id="listing-created-at">2024-12-15</span>
        </div>
        <div class="mb-3">
          <strong>Likes:</strong>
          <span id="listing-likes">3</span>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger me-2" id="delete-post">Delete</button>
          <button class="btn btn-success" id="mark-resolved">Mark as Resolved</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-light mt-5">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>


<style lang="scss" scoped></style>