<script setup>
import { AppState } from '@/AppState';
import { listingsService } from '@/services/ListingsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const listings = computed(() => AppState.activeListing)
const account = computed(() => AppState.account)
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

const pictures = computed(() => {
  return listings.value?.pictures
    ? Array.isArray(listings.value.pictures)
      ? listings.value.pictures
      : [listings.value.pictures]
    : [];
});

</script>


<template>
  <div v-if="listings" class="container mt-5 p-2 mb-3">
    <div class="bg-secondary shadow-lg rounded-4 pb-2">
      <div class="card bg-secondary border-0 mx-5 my-4 ps-2 pt-2">
        <span id="listing-created-at" class="ps-1 mt-2  ms-3 align-self-center">Posted {{
          listings.createdAt.toDateString()
        }}</span>
        <div class="d-flex justify-content-between align-content-center mt-3">
          <div class="d-flex align-content-center">
            <img class=" profile-img m-2" :src="listings.creator.picture" alt="">
            <h3 class="align-self-center text-dark ms-3">{{ listings.creator.name }}</h3>
          </div>
          <div v-if="account?.id != listings?.creatorId">
            <button class="btn btn-primary ms-3 align-self-center" style="height: 50px;">Message Us <i
                class="mdi mdi-chat"></i></button>
          </div>
          <div v-if="account?.id == listings?.creator.id" class="align-self-center me-3">
            <button class="btn btn-danger me-2" id="delete-post">Delete</button>
            <button class="btn btn-success me-2" id="mark-resolved">Mark as Resolved</button>
          </div>
        </div>
        <div class="mb-3">
          <div v-if="pictures.length" id="carouselListing" class="mt-3 carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button v-for="(picture, index) in pictures" :key="index" type="button"
                :data-bs-target="'#carouselListing'" :data-bs-slide-to="index" :class="{ active: index === 0 }"
                aria-current="true" :aria-label="'Slide ' + (index + 1)"></button>
            </div>

            <div class="carousel-inner">
              <div v-for="(picture, index) in pictures" :key="index"
                :class="['carousel-item', { active: index === 0 }]">
                <img :src="picture" alt="Listing Image" class="d-block w-100 img-fluid rounded" />
              </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselListing" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselListing" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div>
          <div class="mb-3 mt-3 text-start">
            <p id="listing-body" class="fs-5">
              {{ listings.body }}
            </p>
          </div>
        </div>
        <hr>
        <div v-if="listings?.location != undefined" class="mb-3">
          <h4>Location:</h4>
          <span id="listing-location">{{ listings.location }}</span>
        </div>
        <div class="d-flex justify-content-between">

          <div class=" align-content-center my-2 d-flex">
            <i class="mdi mdi-currency-usd fs-3 m-0 align-self-center"></i>
            <p id="listing-budget" class=" m-0 align-self-center ">{{ listings.minBudget }} - {{
              listings.maxBudget
            }}</p>
          </div>
          <div class="align-content-center my-2 d-flex">
            <i class="mdi mdi-list-status fs-3 m-0 align-self-center"></i>
            <div class="ps-1 mt-2  ms-3">
              <p class="m-0 align-self-center" v-if="listings?.isResolved == true">Listing Is No Longer Accepting Offers
              </p>
              <p class="m-0 align-self-center" v-else>Listing Is Accepting Offers</p>
            </div>
          </div>
          <div class="mb-3 align-content-center d-flex">
            <span><i class="mdi mdi-heart-outline fs-2 mx-2 align-self-center"></i></span>
            <p id="listing-likes" class="ms-2 m-0 align-self-center">{{ listings.likeCount }}</p>
          </div>
        </div>
        <div class="d-flex align-items-center pb-2">

          <div class="d-flex">
            <div class="d-flex input-group">
            </div>
          </div>
          <div class="d-flex justify-content-end">
          </div>
        </div>
      </div>
      <div class="p-3 mx-4">
        <textarea type="text" class="form-control p-3 bg-light text-dark form-control text-primary rounded mx-2"
          id="input" placeholder="Add a Comment..." rows="5"></textarea>
        <div class="text-end mt-3">
          <button class="btn btn-primary">Post Comment</button>
        </div>
      </div>
      <div class="mb-2 d-flex justify-content-between align-content-center">
        <div>

          <p id="listing-type" class="ms-5">Service Type: {{ listings.type }}</p>
        </div>
        <div>
          <p class="text-dark text-end me-5">{{ listings.createdAt.toLocaleTimeString() }}</p>

        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-light mt-5 text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>


<style lang="scss" scoped>
textarea {
  outline: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}

textarea:focus {
  outline: none;
  border: 2px solid green;
  box-shadow: 0 0 5px rgba(0, 128, 0, 0.5);
}

.carousel-item img {
  object-fit: cover;
  width: 100%;
  max-height: 60dvh;
  height: 375px;
  border-radius: 0.5rem;
}

.profile-img {
  border-radius: 50%;
  height: 65px;
  aspect-ratio: 1/1;
  object-position: center;
  object-fit: cover;
  align-self: center;
}

.bg-green {
  background-color: #194348;
}

.corner {
  border-radius: 5em;
}
</style>