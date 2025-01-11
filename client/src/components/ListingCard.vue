<script setup>
import { AppState } from '@/AppState';
import { Listing } from '@/models/Listing';
import { computed, reactive } from 'vue';
import { likesService } from '@/services/LikesService';
import Pop from '@/utils/Pop';
import { chatsService } from '@/services/ChatsService';

const props = defineProps({
    listing: { type: Listing, required: true }
});

const account = computed(() => AppState.account);
const likes = computed(() => AppState.likes);

const localListing = reactive({
    likeCount: props.listing.likeCount,
    ...props.listing
});

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

async function messageProfile(userId) {
    try {
        await chatsService.createChat(userId)
    } catch (error) {
        Pop.error('Cannot Message User', error)
    }
}
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
                <div>
                    <button @click="messageProfile(props.listing?.creatorId)" class="btn btn-success">Message</button>
                </div>
                <div class="text-end" v-if="account?.id == listing?.creatorId">
                    <i class="mdi mdi-dots-horizontal"></i>
                </div>
            </div>
        </div>
        <div class="card-body">
            <RouterLink :to="{ name: 'Listing', params: { listingId: listing.id } }" class="text-dark">
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
            </RouterLink>
            <div class="card-footer">
                <p class="mb-0"><span class="fw-bold">Comments:</span> 0</p>
                <p class="d-flex align-items-center mb-0">
                    {{ localListing.likeCount || 0 }}
                    <i :class="['mdi', isLiked ? 'mdi-heart' : 'mdi-heart-outline', 'fs-3', 'ms-2']"
                        @click="likePost(localListing.id)" role="button" selectable>
                    </i>
                </p>
            </div>
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 8px;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
