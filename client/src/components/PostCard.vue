<script setup>
import { Listing } from '@/models/Listing';

defineProps({
  listing: { type: Listing, required: true }
})


</script>


<template>
  <div class="rounded rounded-4 card bg-secondary text-primary my-3">
    <div class="d-flex align-items-center">
      <img class="profile-img m-3 ms-5" :src="listing.creator.picture" alt="">
      <div class="d-flex align-items-between">
        <b>
          @{{ listing.creator.name }}
        </b>
        {{ listing.createdAt.getHours() }}h
      </div>
      <span><i class="mdi mdi-storefront-outline fs-1"></i></span>
    </div>
    <div class="ps-5">
      <p>{{ listing.body }}</p>
    </div>
    <img class="img-fluid px-5 listing-pictures" v-if="listing.pictures" :src="listing.pictures" alt="">
    <div>
      <p>{{ }}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center text-primary">
      <div class="pb-3 p-3">
        <b>
          3 Comments
        </b>
      </div>
      <div class="pb-3 p-3 d-flex gap-2 align-items-center">
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
}
</style>