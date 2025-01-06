<script setup>
import Navbar from './components/Navbar.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="gradient-background">
    <router-view />
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.gradient-background {
  background: linear-gradient(to right, #142f32, #4f5749, #5d793e);
}
</style>
