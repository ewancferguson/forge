<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { likesService } from '@/services/LikesService';
import Pop from '@/utils/Pop';
import { computed, reactive } from 'vue';

const account = computed(() => AppState.account);

const props = defineProps({
  listing: { type: Listing, required: true }
});

const localListing = reactive({
  likeCount: props.listing.likeCount,
  ...props.listing,
});

const likes = computed(() => AppState.likes);


const isLiked = computed(() => {
  return likes.value.some(
    (like) =>
      like.listingId === props.listing.id &&
      like.accountId === account.value?.id
  );
});

const likeId = computed(() => {
  const like = likes.value.find(
    (like) =>
      like.listingId === props.listing.id &&
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
  <div id="listingCard" class="rounded rounded-4 card bg-secondary mx-3 my-3 text-primary">
    <router-link :to="{ name: 'Profile', params: { profileId: props.listing.creatorId } }">
      <div id="accountInfo" class="d-flex justify-content-between align-items-center mx-3 mt-2 mb-1 ">
        <div class="d-flex align-items-center">
          <img class="profile-img" :src="listing.creator.picture" alt="">
          <b class="text-primary ms-2">
            @{{ listing.creator.name }}
          </b>
        </div>
        <div class="align-items-center d-flex text-dark">
          <p class="align-self-center m-0">{{ listing.createdAt.getHours() }}h</p>
          <p class="align-self-center m-0" v-if="listing.creator.isBusiness"><i
              class="mdi mdi-storefront-outline fs-3"></i></p>
        </div>
      </div>
      <hr class="text-dark mt-0">
    </router-link>
    <router-link class="text-dark" :to="{ name: 'Listing', params: { listingId: listing.id } }">
      <div class="cardImage">
        <img class="listing-pictures mb-auto img-fluid" v-if="listing.pictures" :src="listing.pictures" alt="">
      </div>
      <div id="card-body" class="mt-3 text-center mx-4 mb-2 p-1">
        <p>{{ listing.body }}</p>
      </div>
    </router-link>
    <hr class="text-dark m-0">
    <div id="cardFooter">
      <div class="d-flex justify-content-between align-items-center text-primary">
        <div class="pb-3 ps-3">
          <b>
            0 Comments
          </b>
        </div>
        <div class="pb-2 pe-3 d-flex gap-2 align-items-center">
          <p class="d-flex align-items-center mb-0">
            {{ localListing.likeCount || 0 }}
            <i :class="['mdi', isLiked ? 'mdi-heart' : 'mdi-heart-outline', 'fs-3', 'ms-2']"
              @click="likePost(localListing.id)" role="button" selectable>
            </i>
          </p>
        </div>
      </div>
    </div>
  </div>
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
  min-height: 10em;
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