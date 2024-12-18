<script setup>
import { AppState } from '@/AppState';
import ListingCard from '@/components/ListingCard.vue';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

onMounted(() =>
  getAllPosts()
)

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.meow(error);
  }
}



const listings = computed(() => AppState.homePageListings)
</script>

<template>
  <section class="container-fluid">
    <div class="row mt-4 mb-4 p-3 text-center">
      <h1 class="text-light">Forging New Opportunities <span class="gradient-text">Together</span></h1>
    </div>
    <div class="row">
      <img id="homeImage" src="../assets/img/backgroundImage.jpg" alt="">
    </div>
    <div id="aboutInfo" class="row d-flex text-dark justify-content-between bg-secondary">
      <div class="d-flex align-items-center">
        <div class="col-md-8 ms-4 mt-3 mb-3 p-3">
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
    <div class="text-center mt-5">
      <h3>
        Recent Posts
      </h3>
    </div>
    <section class="row mt-5 d-flex justify-content-center align-items-center">
      <div class="col-md-3 align-self-center text-center w-25">
        <button class="btn btn-success">Create Listings</button>
      </div>
      <div class="d-flex col-md-3 align-self-center text-center">
        <input class="w-75" type="text" id="searchBar">
        <span class="mdi mdi-magnify fs-3 align-self-center ms-3"></span>
      </div>
      <div class="col-md-3 align-self-center text-center w-25">
        <router-link :to="{ name: 'Posts' }">
          <button class="btn btn-success">Sort Listings</button>
        </router-link>
      </div>
    </section>
    <div class="row justify-content-center d-flex mt-5 mb-5">
      <div class="card bg-secondary text-dark col-md-3 g-3 m-3" v-for="listing in listings" v-bind:key="listing.id">
        <ListingCard :listing="listing" />
      </div>
    </div>
  </section>
  <section class="text-center ms-5 mt-1 mb-5">
    <router-link :to="{ name: 'Posts' }">
      <button class="btn btn-success text-light p-3">
        <h4 class="m-0">Show More Posts</h4>
      </button>
    </router-link>
  </section>
</template>

<style scoped lang="scss">
.gradient-text {
  background: linear-gradient(90deg, #5A6B5E, #C8F1B0);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
}

#searchBar {
  background-color: darkgrey;
  border: 1px solid black;
  border-radius: 12px;
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
  margin-bottom: 1em;
}

#forgeImg {
  height: 375px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
}
</style>
