<script setup>

const categories = ['construction', 'manufacturing', 'maintenance', 'utilities', 'agriculture', 'skilled trades', 'other']

const editablePostData =





</script>


<template>
  <div class="modal" id="createPostModal" tabindex="-1">
    <form>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a Post</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location">
            </div>
            <div class="mb-3">
              <label for="minBudget" class="form-label">Min Budget</label>
              <input type="number" class="form-control" id="minBudget">
            </div>
            <div class="mb-3">
              <label for="maxBudget" class="form-label">Max Budget</label>
              <input type="number" class="form-control" id="maxBudget">
            </div>
            <div class="mb-3">
              <label for="pictures" class="form-label">Pictures</label>
              <input type="url" class="form-control" id="pictures">
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="type">Type</label>
              <select class="form-select" id="type">
                <option selected value="">Choose...</option>
                <option v-for="category in categories" :key="category" value="">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="body" class="form-label">Description</label>
              <textarea class="form-control" id="body" rows="3"></textarea>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>