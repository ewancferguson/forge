<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const props = defineProps({
  listing: { type: Listing, required: true }
})




</script>

<template>
  <router-link :to="{ name: 'Listing', params: { listingId: listing.id } }" id="listingCard"
    class="rounded rounded-4 card bg-secondary mx-3 my-3 text-primary">
    <router-link :to="{ name: 'Profile', params: { profileId: props.listing.creatorId } }">
      <div id="accountInfo" class="d-flex justify-content-between align-items-center mx-3 mt-3 mb-3 ">
        <div class="d-flex align-items-center">
          <img class="profile-img" :src="listing.creator.picture" alt="">
          <b class="text-primary ms-2">
            @{{ listing.creator.name }}
          </b>
        </div>
        <div class="align-items-center d-flex text-dark">
          <p class="align-self-center m-0">{{ listing.createdAt.getHours() }}h</p>
          <p class="align-self-center m-0" v-if="listing.creator.isBusiness"><i
              class="mdi mdi-storefront-outline fs-1"></i></p>
        </div>
      </div>
    </router-link>
    <div class="col-3 d-flex align-items-center justify-content-end">
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
    <div class="cardImage">
      <img class="listing-pictures mb-auto img-fluid" v-if="listing.pictures" :src="listing.pictures" alt="">
    </div>
    <div id="card-body" class="mt-3 text-center mx-4 mb-2 p-1">
      <p>{{ listing.body }}</p>
    </div>
    <div id="cardFooter">
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
  </router-link>
</template>


<style lang="scss" scoped>
.profile-img {
  border-radius: 100em;
  max-height: 3em;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

#card-body {
  max-height: 10dvh;
  overflow-y: auto;
}

#accountInfo {
  min-height: 10dvh;
}

#card-body {
  scrollbar-width: none;
  scrollbar-gutter: none;
}

#accountInfo,
#card-body,
#cardFooter {
  padding: 1rem;
}

#listingCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 45dvh;
}

#cardFooter {
  min-height: 5dvh
}

.cardImage {
  min-height: 15em;
  align-content: center;
}

.listing-pictures {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}
</style>