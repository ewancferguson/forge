<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed } from 'vue';

const account = computed(() => AppState.account)

defineProps({
  listing: { type: Listing, required: true }
})




</script>


<template>
  <div class="rounded rounded-4 card bg-secondary text-primary my-3">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center col-9">
        <img class="profile-img m-3 ms-5" :src="listing.creator.picture" alt="">
        <div class="d-flex align-items-between">
          <b>
            @{{ listing.creator.name }}
          </b>
          {{ listing.createdAt.getHours() }}h
        </div>
        <span v-if="listing.creator.isBusiness"><i class="mdi mdi-storefront-outline fs-1"></i></span>
      </div>
      <div class="col-3 d-flex align-items-center justify-content-end">
        <button v-if="listing.isResolved == true" disabled class="btn btn-danger rounded-5 me-5">RESOLVED</button>
        <span v-if="listing.creatorId == account?.id" class="d-flex justify-content-end fs-1 pe-5" role="button">
          <div class="dropdown">
            <button class="btn btn-secondary  mdi mdi-menu fs-1" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" type="button">Delete</button>
              </li>
              <li><button class="dropdown-item" type="button">Edit</button></li>
              <li><button class="dropdown-item" type="button">Mark as Resolved</button></li>
            </ul>
          </div>
        </span>
      </div>
    </div>
    <div class="ps-5">
      <p>{{ listing.body }}</p>
    </div>
    <img class="img-fluid px-5 listing-pictures" v-if="listing.pictures" :src="listing.pictures" alt="">

    <div class="d-flex justify-content-between align-items-center text-primary">
      <div class="pb-3 ps-5">
        <b>
          3 Comments
        </b>
      </div>
      <div class="pb-3 pe-5 d-flex gap-2 align-items-center">
        <b>
          3 Likes
        </b>
        <i class="mdi mdi-heart-outline fs-1"></i>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  border-radius: 100em;
  max-height: 3em;
  max-width: 100%;
}

.listing-pictures {
  object-fit: cover;
  object-position: center;
  max-height: 25em;
}
</style>