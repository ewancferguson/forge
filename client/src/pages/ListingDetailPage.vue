<script setup>
import { AppState } from '@/AppState';
import { likesService } from '@/services/LikesService';
import { listingsService } from '@/services/ListingsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, reactive, watch } from 'vue';
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




const localListing = reactive({
  likeCount: listings.value?.likeCount,
});

const likes = computed(() => AppState.likes);

const isLiked = computed(() => {
  return likes.value.some(
    (like) =>
      like.listingId === route.params.listingId &&
      like.accountId === account.value?.id
  );
});

const likeId = computed(() => {
  const like = likes.value.find(
    (like) =>
      like.listingId === route.params.listingId &&
      like.accountId === account.value?.id
  );
  return like?.id;
});

async function likePost(listingId) {
  try {
    if (isLiked.value) {
      await likesService.unlikePost(likeId.value);

      const likeIndex = AppState.likes.findIndex(
        (like) => like.id === likeId.value
      );
      if (likeIndex !== -1) {
        AppState.likes.splice(likeIndex, 1);
      }

      localListing.likeCount = Math.max(0, localListing.likeCount - 1);
    } else {
      await likesService.likePost(listingId);


      localListing.likeCount += 1;
    }
  } catch (error) {
    Pop.error(error);
  }
}
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
            <button class="button-delete">
              <svg viewBox="0 0 448 512" class="svgIcon">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                </path>
              </svg>
            </button>
            <button class="btn btn-success m-2" id="mark-resolved">Mark as Resolved</button>
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
          <p class="d-flex align-items-center mb-3">
            {{ localListing.likeCount || 0 }}
            <i :class="['mdi', isLiked ? 'mdi-heart' : 'mdi-heart-outline', 'fs-3', 'ms-2']"
              @click="likePost(listings?.id)" role="button" selectable>
            </i>
          </p>
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

/* From Uiverse.io by vinodjangid07 */
.button-delete {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: .3s;
  overflow: hidden;
  position: relative;
}

.svgIcon {
  width: 12px;
  transition-duration: .3s;
}

.svgIcon path {
  fill: white;
}

.button-delete:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: .3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.button-delete:hover .svgIcon {
  width: 50px;
  transition-duration: .3s;
  transform: translateY(60%);
}

.button-delete::before {
  position: absolute;
  top: -20px;
  content: "Delete";
  color: white;
  transition-duration: .3s;
  font-size: 2px;
}

.button-delete:hover::before {
  font-size: 13px;
  opacity: 1;
  transform: translateY(30px);
  transition-duration: .3s;
}
</style>