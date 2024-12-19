<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const listings = computed(() => {
    if (activeFilterType.value == 'any') return AppState.listings
    return AppState.listings.filter(listing => listing.type == activeFilterType.value)
})

const activeFilterType = ref('any')

const types = [
    { name: 'any' },
    { name: 'construction' },
    { name: 'manufacturing' },
    { name: 'maintenance' },
    { name: 'utilities' },
    { name: 'agriculture' },
    { name: 'skilled trades' },
    { name: 'other' },
]

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
</script>


<template>
    <div class="container">
        <section class="row">
            <div class="col-md-12 text-success d-flex justify-content-between py-4">
                <h3 class="dropdown">
                    <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </span>
                    <ul class="dropdown-menu">
                        <li v-for="type in types" :key="'filter-' + type.name" @click="activeFilterType = type.name">
                            <button class="dropdown-item" type="button">{{
                                type.name }}</button>
                        </li>
                    </ul>
                </h3>
                <h3>Following</h3>
                <h3>Recent Posts</h3>
            </div>
        </section>
        <section class="row">
            <div v-for="listing in listings" :key="listing.id">
                <PostCard :listing="listing" />
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped>
h4 {
    margin-top: 2em;
    text-align: center;
}
</style>