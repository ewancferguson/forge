<script setup>
</script>


<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-4">
        <div class="input-group bg-secondary rounded rounded-2 ms-5 my-4 d-flex align-items-center">
          <button type="button" class="btn fs-1 p-0 ps-2 fw-bold"><i class="mdi mdi-magnify"></i></button>
          <input class="fs-5 fw-bold form-control bg-secondary border border-0" placeholder="Search" />
        </div>
        <div class="ms-5 mb-3">
          <div class="d-flex">
            <img class="contact-img"
              src="https://images.unsplash.com/photo-1722816738620-5eb5fc059487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1pY2tleSUyMG1vdXNlfGVufDB8fDB8fHww"
              alt="">
            <div class="col-11">
              <span class=" d-flex justify-content-between">
                <p class="text-light fs-5 ps-3">Mickey Mouse</p>
                <span class="text-secondary">3m</span>
              </span>
              <span class=" d-flex justify-content-between align-items-center">
                <p class="text-secondary ps-3">It's the Micky Mouse Party</p>
                <span class="message-pin fs-4 text-success"><i class="mdi mdi-pin"></i></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 pt-3">
        <span class="text-light fs-2 ms-5 p-5">Mickey Mouse</span>
        <div class="ms-5 mt-4 ps-5 d-flex">
          <img class="contact-img"
            src="https://images.unsplash.com/photo-1722816738620-5eb5fc059487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1pY2tleSUyMG1vdXNlfGVufDB8fDB8fHww"
            alt="">
          <div class="">
            <p class="text-light fs-5 ps-3">Mickey Mouse</p>
            <p class="text-light ps-3">It's the Micky Mouse Party</p>
          </div>
          <span class="text-secondary align-self-end">3:30</span>
        </div>
        <div class="ms-5 mt-4 ps-5 d-flex justify-content-end">
          <div class="">
            <p class="text-light fs-5 ps-3 d-flex justify-content-end">You</p>
            <p class="text-light ps-3 d-flex justify-content-end">It's the Micky Mouse Party</p>
          </div>
          <span class="text-secondary align-self-end">3:30</span>
          <img class="contact-img"
            src="https://images.unsplash.com/photo-1722816738620-5eb5fc059487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1pY2tleSUyMG1vdXNlfGVufDB8fDB8fHww"
            alt="">
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.contact-img {
  border-radius: 10px;
  max-height: 5em;
}

.message-pin {
  max-height: 2em;
  transform: rotate(45deg);
}
</style>