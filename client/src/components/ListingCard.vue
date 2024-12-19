<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed } from 'vue';
import { likesService } from '@/services/LikesService';
import Pop from '@/utils/Pop';

const account = computed(() => AppState.account)
defineProps({
    listing: { type: Listing, required: true }
})



async function likePost(listingId) {
    try {
        await likesService.likePost(listingId)
    } catch (error) {
        Pop.error(error)
    }
}


</script>


<template>
    <div id="listingCard" class="p-2 ">
        <div class="d-flex">
            <div class="align-items-center d-flex">
                <img id="creatorImage" :src="listing?.creator.picture" alt="">
                <div class="ms-2 align-items-center">
                    <h3 class="mb-0">{{ listing?.creator.name }}</h3>
                    <p class="m-0 p-0" v-if="listing?.creator.isBusiness === true">Business</p>
                </div>
            </div>
            <div class="text-end" v-if="account?.id == listing?.creatorId"><i class="mdi mdi-dots-horizontal"></i></div>
        </div>
        <img class="img-fluid card-img mb-2" id="listingImage" :src="listing?.pictures" alt="">
        <div class="text-start mt-1">

            <p v-if="listing?.creator.isBusiness == true"><span class="fw-bold">Service Cost:</span> ${{
                listing?.minBudget }} - ${{ listing?.maxBudget }}</p>

            <p v-else><span class="fw-bold">Budget:</span> ${{ listing?.minBudget }} - ${{ listing?.maxBudget }}</p>

        </div>
        <p class="mt-2"><span class="fw-bold">Description:</span> {{ listing?.body }}</p>

        <p class="listing-description" v-if="listing?.isResolved != true && listing?.creator.isBusiness == true">Service
            Still
            Available</p>

        <p class="listing-description" v-else-if="listing?.isResolved == true && listing?.creator.isBusiness == true">
            Service
            No Longer Available</p>

        <p class="listing-description" v-else-if="listing?.isResolved != true && listing?.creator.isBusiness == false">
            {{
                listing?.creator.name }} Is Still Seeking Help</p>

        <p class="listing-description" v-else>{{
            listing?.creator.name }} Is No Longer Seeking Help</p>

        <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0"><span class="fw-bold">Comments:</span> 0</p>
            <p class="d-flex align-items-center mb-0">0
                <i @click="likePost(listing?.id)" role="button" class="mdi mdi-heart-outline fs-3 ms-2" selectable>
                </i>
            </p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
#listingCard {
    margin: 1em
}

.listing-description {
    font-weight: bold;
    margin-top: 1em;
}

#creatorImage {
    border-radius: 50%;
    height: 55px;
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