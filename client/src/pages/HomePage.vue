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
    <div id="aboutInfo" class="row d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="col-md-8 ms-4 mt-3 mb-3 p-3">
          <h1>Welcome To Forge</h1>
          <p class="mt-4 ms-3 col-md-10"> The platform where businesses and consumers in the construction and trade
            industry
            come
            together. Whether
            you’re a contractor looking to connect with others, a consumer seeking reliable services, or a business
            aiming
            to promote your expertise, Forge makes it easy to grow and succeed. Post your needs, explore professional
            services, and build meaningful connections that will take your projects to the next level</p>
        </div>
        <div class="align-items-center col-md-3">
          <img id="forgeImg" src="../assets/img/forge.png" alt="">
        </div>
      </div>
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

#aboutInfo {
  padding: 0px;
  overflow: hidden;
  margin-top: 1em;
  margin-bottom: 1em;
}

#forgeImg {
  height: 375px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
}
</style>
