<script setup>
import { AppState } from '@/AppState';
import ListingCard from '@/components/ListingCard.vue';
import { likesService } from '@/services/LikesService';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';


const listings = computed(() => {
  if(activeFilterCategory.value == 'all') return AppState.homePageListings
  return AppState.homePageListings.filter(listings => listings.type == activeFilterCategory.value)
})

const activeFilterCategory = ref('all')

const categories = [
  { name: 'all' },
  { name: 'construction' },
  { name: 'manufacturing' },
  { name: 'maintenance' },
  { name: 'utilities' },
  { name: 'agriculture' },
  { name: 'skilled trades' },
  { name: 'other' },
]

onMounted(() => {
  getAllPosts()
  getLikes()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.meow(error);
  }
}

async function getLikes() {
  try {
    await likesService.getLikes()
  }
  catch (error) {
    Pop.error(error);
  }
}


const identity = computed(() => AppState.identity)
</script>

<template>
  <section class="container-fluid bg-light">
    <div id="announcement" class="row  p-5 text-center">
      <h1 class="text-dark">Forging New Opportunities <span class="gradient-text">Together</span></h1>
    </div>
    <div class="row bg-hero justify-content-center" >
      <div class="form-bg col-md-5 m-5">
        <div class="container">
          <div class="text-light fs-1 kanit-bold">Find top-rated businesses in your area</div>
        </div>
      </div>
      <div class="col-md-5"></div>
    </div>
    <div class="row justify-content-evenly bg-light py-3">
      <div @click="activeFilterCategory = category.name" v-for="category in categories" :key="category.name" role="button" class="col-md-1 text-center p-2">
        <div class="category-box text-capitalize py-2">
          <div v-if="category.name == 'all'"><i class="mdi mdi-infinity"></i></div>
          <div v-if="category.name == 'construction'"><i class="mdi mdi-account-hard-hat"></i></div>
          <div v-if="category.name == 'manufacturing'"><i class="mdi mdi-office-building"></i></div>
          <div v-if="category.name == 'maintenance'"><i class="mdi mdi-pipe"></i></div>
          <div v-if="category.name == 'utilities'"><i class="mdi mdi-water"></i></div>
          <div v-if="category.name == 'agriculture'"><i class="mdi mdi-tractor"></i></div>
          <div v-if="category.name == 'skilled trades'"><i class="mdi mdi-wrench"></i></div>
          <div v-if="category.name == 'other'"><i class="mdi mdi-head-question"></i></div>
          <div>{{ category.name }}</div>
        </div>
      </div>
    </div>
    <div id="aboutInfo" class="row d-flex text-dark justify-content-between bg-secondary">
      <div class="d-flex align-items-center">
        <div id="homeDescription" class="col-md-8 mt-3 p-3">
          <h1>Welcome To Forge</h1>
          <p class="mt-4 ms-3 col-md-10"> The platform where businesses and consumers in the construction and trade
            industry
            come
            together. Whether
            you’re a contractor looking to connect with others, a consumer seeking reliable services, or a business
            aiming
            to promote your expertise, Forge makes it easy to grow and succeed. Post your needs, explore professional
            services, and build meaningful connections that will take your projects to the next level</p>
        </div>
        <div class="align-items-center col-md-3">
          <img id="forgeImg" src="../assets/img/forge.png" alt="">
        </div>
      </div>
    </div>

    <section id="postTitle" class="gradient-background row d-flex justify-content-around text-center p-5">
      <div class="col-md-4 col-sm-3">
        <router-link :to="{ name: 'Posts' }">
          <button class="btn btn-success">Sort Listings</button>
        </router-link>
      </div>
      <div class="col-md-4 col-sm-3">
        <h3 class="gradient-text">
          Recent Listings
        </h3>
      </div>
      <div class="col-md-4 col-sm-3">
        <button data-bs-toggle="modal" data-bs-target="#createPostModal" v-if="identity" class="btn btn-success">Create
          Listings </button>
        <p class="m-0 align-self-center" v-if="!identity">Please Sign In To Post</p>
      </div>
    </section>



    <div id="listingContainer" class=" gradient-background  row d-flex header finisher-header">
      <div id="cardListing" class=" text-dark col-xl-3 col-lg-4 col-md-5 col-sm-5 " v-for="listing in listings"
        v-bind:key="listing.id">
        <ListingCard :listing="listing" />
      </div>
    </div>
  </section>
  <section class=" gradient-background text-center p-5">
    <router-link :to="{ name: 'Posts' }">
      <button class="btn btn-success text-dark p-3">
        <p class="m-0">Show More Posts</p>
      </button>
    </router-link>
  </section>

</template>

<style scoped lang="scss">

.bg-hero{
  background-image:url('../assets/img/backgroundImage.jpg');
  height: 55dvh;
  background-position: calc(50%) calc(50% - 12rem);
  background-size: cover;

}

.form-bg{
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 0.3rem;
}

.category-box i{
  color: #FC5647;
  font-size: xx-large;
}

.category-box{
  transition: 0.3s ease-in-out;
  border-radius: 0.25rem;
}

.category-box:hover{
  transform: scale(1.1);
  background-color: #9e9e9e;

    i{
      color: #ff9959;
    }
}

.gradient-text {
  background: linear-gradient(to right, #FC5647, #ff9959, #ffe9db);
  background-clip: text;
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  animation: animate-gradient 2.5s linear infinite;
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


@keyframes animate-gradient {
  to {
    background-position: 200%;
  }
}

#searchBar {
  background-color: darkgrey;
  border: 1px solid black;
  border-radius: 8px;
}

#cardListing {
  margin-top: 1em;
  padding: 1em;
}

#homeImage {
  object-fit: cover;
  object-position: bottom;
  height: 71dvh;
  width: 100%;
  justify-content: center;
  padding: 0px;
  filter: brightness(50%);
  user-select: none;
  -webkit-user-drag: none;
}

#aboutInfo {
  padding: 1em;
  overflow: hidden;

}

#forgeImg {
  height: 375px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  display: block;
}

@media (max-width: 768px) {
  #announcement {
    display: none !important;
  }
}

@media (min-width: 675px) {
  #mobilePostTitle {
    display: none !important;
  }
}

@media (max-width: 675px) {
  #cardListing {
    padding: 6px;
    width: 100%;
  }

  #listingContainer {
    padding: 1em;
  }

  #homeDescription {
    text-align: center;
    margin: 0px;
  }

  #postTitle {
    display: none !important;
  }
}

@media (max-width: 768px) {
  #forgeImg {
    display: none;
  }

  #cardListing {
    margin: 12px;
    padding: 12px;
  }

  #listingContainer {
    justify-content: center;
  }
}


@media (max-width: 992px) {
  #listingContainer {
    justify-content: center;
  }
}
</style>
