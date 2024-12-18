<script setup>
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';

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
  <h1>kk</h1>
</template>


<style lang="scss" scoped></style>