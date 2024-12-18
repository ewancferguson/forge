<script setup>

</script>

<template>
  <div class="container-fluid ">
    <section class="ms-3 row d-flex">
      <div class="justify-content-start col-md-9">
        <div class="about">
          <h1 class="text-lime my-5">How does the Forge Work?</h1>
        </div>
        <div class="ms-5">
          <div class="d-flex ps-5 ms-3">
            <p class="col-7 text-light fw-thin mb-5 fs-4">The Forge is a platform designed to bridge the gap between
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
      <div class="justify-content-end col-md-3">
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

#forgeCropped {
  height: 500px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}
</style>