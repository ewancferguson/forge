<script setup>
import { AppState } from '@/AppState';
import EditAccountModal from '@/components/EditAccountModal.vue';
import ListingCard from '@/components/ListingCard.vue';
import PostCard from '@/components/PostCard.vue';
import { listingsService } from '@/services/ListingsService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const account = computed(() => AppState.account);
const listings = computed(() => AppState.profileListings);

const hasSocialLinks = computed(() => {
  return account.value?.facebook || account.value?.linkedIn || account.value?.website;
});

onMounted(() => {
  getUsersPosts()
  getMyListings()
})

async function getUsersPosts() {
  try {
    const userId = account?.value.id
    await postsService.getUsersPosts(userId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getMyListings() {
  try {
    await listingsService.getMyListings()
  }
  catch (error) {
    Pop.error(error);
    logger.error('getting my listings', error)
  }
}
</script>

<template>
  <div class="container-fluid p-0 bg-secondary">
    <div v-if="account" class="row m-0 p-0 d-flex justify-content-around">
      <div class="col-md-8 col-12 p-0 m-0 shadow-lg mt-2 mb-2 rounded">
        <div class="coverImg position-relative rounded-top" :style="account?.coverImg ?
          { 'background-image': `url(${account.coverImg})`, 'background-size': 'cover', 'background-position': 'center' }
          : { 'background': 'linear-gradient(to right, #142f32, #4f5749, #5d793e)' }">
          <img class="profile-img position-absolute" :src="account.picture" alt=""
            style="width: 150px; height: 150px; border-radius: 50%; top: 65%; left: 5%; z-index: 3; margin-top: 0px;" />
        </div>
        <div class="profileContent p-2" style="left: 5%;">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h3 class="text-primary text-capitalize pt-3"> {{ account?.name }}</h3>
              <p>{{ account?.email }}</p>
              <div class="d-flex">
                <button data-bs-toggle="modal" data-bs-target="#editAccountModal"
                  class="btn btn-success fw-bold text-primary py-2 px-4 mb-4 rounded-4 outline">
                  EDIT ACCOUNT
                </button>
                <div v-if="account?.facebook || account?.linkedIn || account?.website" class="dropdown ms-2">
                  <button class="btn btn-success fw-bold text-primary py-2 px-4 mb-4 rounded-4 outline dropdown-toggle"
                    type="button" id="socialDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                    SOCIALS
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="socialDropdownButton">
                    <li><a v-if="account?.facebook" class="dropdown-item" :href="account?.facebook"
                        target="_blank">Facebook</a></li>
                    <li><a v-if="account?.linkedIn" class="dropdown-item" :href="account?.linkedIn"
                        target="_blank">LinkedIn</a></li>
                    <li><a v-if="account?.website" class="dropdown-item" :href="account?.website"
                        target="_blank">Website</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="hasSocialLinks" class="card bg-green text-light p-3 rounded-4 fw-bold">
              <a v-if="account?.facebook" class="d-block text-light mb-2" :href="account?.facebook">FACEBOOK</a>
              <a v-if="account?.linkedIn" class="d-block text-light mb-2" :href="account?.linkedIn">LINKEDIN</a>
              <a v-if="account?.website" class="text-light" :href="account?.website">COMPANY SITE</a>
            </div>
          </div>
        </div>
        <div class="justify-content-center row">
          <h3 class="text-primary text-center p-3">My Posts</h3>
          <div class="w-75 justify-self-center text-center" v-for="listing in listings" v-bind:key="listing.id">
            <PostCard :listing="listing" />
          </div>
          <div v-if="!listings" class="text-center">
            <h3>Loading Posts... <i class="mdi mdi-loading mdi-spin"></i></h3>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-2 col-12 rounded">
        <h2 class="text-center">Reviews</h2>
        <div class="reviews">
          <div class="reviewCard">
            <div class="header">
              <div class="image"></div>
              <div>
                <div class="stars">
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                </div>
                <p class="name">John Doe</p>
              </div>
            </div>


            <p class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              voluptatem alias ut provident sapiente repellendus.
            </p>
          </div>
          <div class="reviewCard">
            <div class="header">
              <div class="image"></div>
              <div>
                <div class="stars">
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                </div>
                <p class="name">John Doe</p>
              </div>
            </div>
            <p class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              voluptatem alias ut provident sapiente repellendus.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-light mt-5">Loading Account... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <EditAccountModal />
</template>

<style scoped lang="scss">
.reviewCard {
  background-color: rgba(243, 244, 246, 1);
  padding: 2rem;
  max-width: 320px;
  border-radius: 10px;
  box-shadow: 0 20px 30px -20px rgba(5, 5, 5, 0.24);
  margin-top: 0.75em;
}

.header {
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  gap: 1rem;
}

.header .image {
  height: 4rem;
  width: 4rem;
  border-radius: 9999px;
  object-fit: cover;
  background-color: royalblue;
}

.stars {
  display: flex;
  justify-content: center;
  grid-gap: 0.125rem;
  gap: 0.125rem;
  color: rgba(34, 197, 94, 1);
}

.stars svg {
  height: 1rem;
  width: 1rem;
}

.name {
  margin-top: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, 1);
}

.message {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 1rem;
  color: rgba(107, 114, 128, 1);
}

.reviews {
  padding: 0.75em;
}

.profileContent {
  z-index: 2;
  position: relative;
}

.gradient-background {
  background: linear-gradient(to right, #142f32, #4f5749, #5d793e);
}

.coverImg {
  width: 100%;
  z-index: 1;
  margin: 0px;
  padding: 0px;
}

img {
  max-width: 150px;
}

.coverImg {
  height: 200px;
  background-color: #ccc;
  position: relative;
}

.profile-img {
  border: 5px solid #142f32;
  margin-bottom: 0px;
}


.bg-green {
  background-color: #28a745;
}

.profileContent {
  margin-top: 80px;
}
</style>
