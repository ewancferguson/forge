<script setup>
import { Listing } from '@/models/Listing';

defineProps({
  listing: { type: Listing, required: true }
})


</script>


<template>
<<<<<<< HEAD

  <div class="rounded rounded-4 card bg-secondary text-primary my-3">
    <div class="d-flex">
      <img class="profile-img m-3 ms-5" :src="listing.creator.picture" alt="">
      <div class="d-flex align-items-center">
        <b>
          @{{ listing.creator.name }}
        </b>
        {{ listing.createdAt.getHours() }}h
      </div>
    </div>
    <div class="ps-5">
      <p>{{ listing.body }}</p>
    </div>
    <img class="img-fluid px-5 pb-5 listing-pictures" v-if="listing.pictures" :src="listing.pictures" alt="">
    <div>
      <p>{{ }}</p>
    </div>
=======
  <div class="col-12">
    {{ listing }}
>>>>>>> 225ea18 (get listings on homepage)
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