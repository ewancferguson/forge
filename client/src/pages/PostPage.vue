<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const listings = computed(() => AppState.listings)

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
                <h3>Sort By</h3>
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