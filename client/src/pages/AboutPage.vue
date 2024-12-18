<script setup>

</script>

<template>
  <div class="container-fluid ">
    <section id="aboutInfo" class="row d-flex">
      <div id="aboutText" class="justify-content-start col-md-9">
        <div class="about">
          <h1 class="text-lime ms-5 my-5">How does the Forge Work?</h1>
        </div>
        <div class="ms-5">
          <div class="d-flex ps-5 ms-3">
            <p class="col-md-9 text-light fw-thin mb-5 fs-4">The Forge is a platform designed to bridge the gap between
              consumers and local businesses. Consumers can post their specific business needs—whether it's a repair
              job,
              a
              service, or a custom request—and businesses can respond in the comments with tailored offers, pricing, or
              availability. On the flip side, businesses can showcase their services and special offers, making it
              easier
              for consumers to discover and connect with the right providers.
            </p>
          </div>
        </div>
      </div>
      <div class="justify-content-end col-md-3 forgeContainer">
        <span><img id="forgeCropped" src="../assets/img/forge.png" alt="Forge Image"></span>
      </div>
    </section>
    <div class="bg-grey row">
      <h1 class="text-green m-5 col-3">Contributors</h1>
    </div>
  </div>

</template>

<style scoped lang="scss">
.text-lime {
  color: #E3FFCC;
}

.text-green {
  color: #142F32;
}

.bg-grey {
  background-color: #D9D9D9;
}

#aboutInfo {
  min-height: 75dvh;
  align-content: center;
}

#forgeCropped {
  height: 450px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
}

.forgeContainer {
  height: 600;
  aspect-ratio: 1/1;
  overflow: hidden;
  align-content: center;
}

div {
  scroll-behavior: smooth;
}

@media (min-width: 1400px) {
  #aboutInfo {
    min-height: 80dvh;
  }

  #forgeCropped {
    height: 425px;
  }
}
</style>