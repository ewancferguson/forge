<script setup>

</script>

<template>
  <div id="desktopAboutUs" class="container-fluid ">
    <section id="aboutInfo" class="row d-flex">
      <div id="aboutText" class="justify-content-start col-md-9">
        <div class="about">
          <h1 class="text-lime my-5">How does the Forge Work?</h1>
        </div>
        <div class="ms-5">
          <div id="forgeInfo" class="d-flex ps-5">
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


  <div id="mobileAboutUs" class="container-fluid ">
    <section id="aboutInfo" class="row d-flex bg-secondary">
      <div id="aboutText" class="justify-content-center col-12">
        <div class="about mt-3">
          <h1 class="text-green">How does the Forge Work?</h1>
        </div>
        <div id="forgeInfo" class="d-flex">
          <p class=" fw-thin mb-5 fs-4 p-3 text-dark">The Forge is a platform designed to bridge the
            gap
            between
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
    </section>
    <div class="bg-primary row">
      <h1 class="text-light m-5 col-3">Contributors</h1>
    </div>
  </div>

</template>

<style scoped lang="scss">
.about {
  margin-inline-start: 1em
}



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
  height: 600px;
  aspect-ratio: 1/1;
  overflow: hidden;
  align-content: center;
}

div {
  scroll-behavior: smooth;
}

@media (min-width: 768px) {
  #mobileAboutUs {
    display: none !important;
  }

  #aboutInfo {
    margin-top: 2em;
  }
}

@media (max-width: 768px) {
  .about {
    justify-content: center;
    text-align: center;
  }

  #forgeInfo {
    text-align: center;
    justify-content: center;
  }

  #forgeCropped {
    display: none !important;
  }

  .forgeContainer {
    display: none !important;
  }

  #desktopAboutUs {
    display: none !important;
  }
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