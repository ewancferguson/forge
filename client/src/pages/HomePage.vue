<script setup>

</script>

<template>
  <section class="container-fluid">
    <div class="row mt-4 mb-4 p-3 text-center">
      <h1 class="text-light">Forging New Opportunities <span class="gradient-text">Together</span></h1>
    </div>
    <div class="row">
      <img id="homeImage" src="../assets/img/backgroundImage.jpg" alt="">
    </div>
  </section>
</template>

<style scoped lang="scss">
.gradient-text {
  background: linear-gradient(90deg, #5A6B5E, #C8F1B0);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
}

#homeImage {
  object-fit: cover;
  object-position: bottom;
  height: 71dvh;
  width: 100%;
  justify-content: center;
  padding: 0px;
  filter: brightness(50%);
  user-select: none;
  -webkit-user-drag: none;
}
</style>
