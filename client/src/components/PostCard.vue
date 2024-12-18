<script setup>
import { Listing } from '@/models/Listing';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';

defineProps({
  listing: { type: Listing, required: true }
})

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
  <div class="col-12 ">
    {{ listing }}
  </div>
</template>


<style lang="scss" scoped></style>