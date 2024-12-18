<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed } from 'vue';

defineProps({
    listing: { type: Listing, required: true }
})

const account = computed(() => AppState.account)

</script>


<template>
    <div id="listingCard" class="p-2 ">
        <div class="d-flex">
            <img id="creatorImage" :src="listing?.creator.picture" alt="">
            <div class="ms-2 align-items-center">
                <h3>{{ listing?.creator.name }}</h3>
                <h5>{{ listing?.creator.isBusiness }}</h5>
            </div>
            <div class="text-end" v-if="account?.id == listing?.creatorId"><i class="mdi mdi-dots-horizontal"></i></div>
        </div>
        <img class="img-fluid card-img" id="listingImage" :src="listing?.pictures" alt="">
        <div class="text-start mt-1">
            <p><span class="fw-bold">Budget:</span> ${{ listing?.minBudget }} - ${{ listing?.maxBudget }}</p>
        </div>
        <p class="mt-2"><span class="fw-bold">Description:</span> {{ listing?.body }}</p>
        <div class="d-flex">
            <div class="text-start align-self-center">
                <p><span class="fw-bold">Comments:</span> 0</p>
            </div>
            <div class="text-end align-self-center">
                <p>0 <i class="mdi mdi-heart-outline fs-3"></i></p>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
#listingCard {
    margin: 1em
}

#creatorImage {
    border-radius: 50%;
    height: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
}

#listingImage {
    margin-top: 1em;
    height: 200px;
    width: 100%;
}
</style>