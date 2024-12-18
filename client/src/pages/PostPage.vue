<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/PostCard.vue';
import { computed } from 'vue';

const listings = computed(() => AppState.listings)

</script>


<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-success d-flex justify-content-between py-4">
                <h3>Sort By</h3>
                <h3>Following</h3>
                <h3>Recent Posts</h3>
            </div>
        </div>
    </div>
    <PostCard />
</template>


<style lang="scss" scoped>
h4 {
    margin-top: 2em;
    text-align: center;
}
</style>