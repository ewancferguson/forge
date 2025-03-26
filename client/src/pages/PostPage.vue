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


    <div class="search-bar">
        <input type="text" class="form-control" placeholder="How can we help?">
        <div class="location-input">
            <i class="bi bi-geo-alt"></i>
            <input type="text" class="form-control" placeholder="83704" style="width: 70px;">
        </div>
        <div class="search-icon">
            <i class="bi bi-search"></i>
        </div>
    </div>
    <div class="container">
        <section class="row">
            <div class="col-md-12 text-success mt-3 d-flex justify-content-between py-4">
                <h3 class="dropdown">
                    <span class="ms-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <h3 class="me-2">Recent Posts</h3>
            </div>
        </section>
        <section class="row d-flex">
            <div class="col-xxl-3 col-xl-4 col-md-6 col-12" v-for="listing in listings" :key="listing.id">
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


.search-bar {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 50px;
    padding: 5px 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
}

.search-bar input {
    border: none;
    outline: none;
    padding: 8px 10px;
    flex: 1;
    background: transparent;
}

.search-bar input::placeholder {
    color: #888;
}

.location-input {
    display: flex;
    align-items: center;
    border-left: 1px solid #ccc;
    padding-left: 10px;
    margin-left: 5px;
}

.search-icon {
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
}
</style>