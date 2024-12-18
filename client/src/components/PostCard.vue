<script setup>
import { Listing } from '@/models/Listing';

defineProps({
  listing: { type: Listing, required: true }
})


</script>


<template>

  <div class="rounded rounded-4 card bg-grey text-dark">
    <div class="d-flex">
      <img class="profile-img m-2 ms-4" :src="listing.creator.picture" alt="">
      <span class="fw-bold">
        @{{ listing.creator.name }}
      </span>
      {{ listing.creator.createdAt }}
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bg-grey {
  background-color: #D9D9D9;
}

.profile-img {
  border-radius: 100em;
  max-height: 3em;
  max-width: 100%;
}
</style>