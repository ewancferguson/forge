<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed } from 'vue';
import { likesService } from '@/services/LikesService';
import Pop from '@/utils/Pop';




const props = defineProps({
    listing: { type: Listing, required: true }
})





async function likePost(listingId) {
    try {
        await likesService.likePost(listingId)
    } catch (error) {
        Pop.error(error)
    }
}

const account = computed(() => AppState.account)


</script>


<template>
    <div id="listingCard" class="card bg-secondary text-dark flex-column d-flex align-content-between">
        <div class="card-header">
            <div class="d-flex">
                <RouterLink :to="{ name: 'Profile', params: { profileId: props.listing.creatorId } }"
                    class="align-items-center d-flex">

                    <img id="creatorImage" :src="listing?.creator.picture" alt="">
                    <div class="ms-2 align-items-center text-primary">
                        <h3 class="mb-0">{{ listing?.creator.name }}</h3>
                        <p class="m-0 p-0" v-if="listing?.creator.isBusiness">Business</p>
                    </div>
                </RouterLink>
                <div class="text-end" v-if="account?.id == listing?.creatorId">
                    <i class="mdi mdi-dots-horizontal"></i>
                </div>
            </div>
        </div>
        <div class="card-body">
            <img class="img-fluid card-img mb-2" id="listingImage" :src="listing?.pictures" alt="">
            <p class="listing-description" v-if="listing?.isResolved !== true && listing?.creator.isBusiness">
                Service Still Available
            </p>
            <p class="listing-description" v-else-if="listing?.isResolved === true && listing?.creator.isBusiness">
                Service No Longer Available
            </p>
            <p class="listing-description" v-else-if="listing?.isResolved !== true && !listing?.creator.isBusiness">
                {{ listing?.creator.name }} Is Still Seeking Help
            </p>
            <p class="listing-description" v-else>
                {{ listing?.creator.name }} Is No Longer Seeking Help
            </p>
            <div class="text-start fw-bold">
                <div v-if="listing?.creator.isBusiness">
                    <span>Service Cost:</span>
                </div>
                <div v-else>
                    <span>Budget:</span>
                </div>
            </div>
            <div class="text-start ms-3 mt-1">
                <p v-if="listing?.creator.isBusiness">
                    ${{ listing?.minBudget }} - ${{ listing?.maxBudget }}
                </p>
                <p v-else>
                    ${{ listing?.minBudget }} - ${{ listing?.maxBudget }}
                </p>
            </div>
            <span class="fw-bold mt-1">Description:</span>
            <div id="listingDescription">
                <p class="mt-2"> {{ listing?.body }}</p>
            </div>
        </div>
        <div class="card-footer">
            <p class="mb-0"><span class="fw-bold">Comments:</span> 0</p>
            <p class="d-flex align-items-center mb-0">
                {{ listing?.likeCount || 0 }}
                <i @click="likePost(listing?.id)" role="button" class="mdi mdi-heart-outline fs-3 ms-2" selectable></i>
            </p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.listing-description {
    text-align: center;
}

#listingDescription {
    min-height: 5em;
    overflow-y: scroll;
    scrollbar-width: none;
}


.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header,
.card-footer,
.card-body {
    padding: 1rem;
    border-radius: 4px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body img.card-img {
    border-radius: 8px;
    margin-bottom: 1rem;
}

.card h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.card p {
    margin: 0.5rem 0;
}

.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.text-end {
    margin-left: auto;
}

.text-start {
    text-align: start;
}

.m-0 {
    margin: 0;
}

.mb-0 {
    margin-bottom: 0;
}

.ms-2 {
    margin-left: 0.5rem;
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