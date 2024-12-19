<script setup>
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { ref } from 'vue';


const categories = ['construction', 'manufacturing', 'maintenance', 'utilities', 'agriculture', 'skilled trades', 'other']

const editablePostData = ref({
  location: '',
  minBudget: '',
  maxBudget: '',
  pictures: '',
  type: '',
  description: ''
})


async function createListing() {
  try {
    await postsService.createListing(editablePostData.value)
  }
  catch (error) {
    Pop.error(error);
  }
}


</script>


<template>
  <div class="modal" id="createPostModal" tabindex="-1">
    <form @submit.prevent="createListing()">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a Post</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input v-model="editablePostData.location" type="text" class="form-control" id="location">
            </div>
            <div class="mb-3">
              <label for="minBudget" class="form-label">Min Budget</label>
              <input v-model="editablePostData.minBudget" type="number" class="form-control" id="minBudget">
            </div>
            <div class="mb-3">
              <label for="maxBudget" class="form-label">Max Budget</label>
              <input v-model="editablePostData.maxBudget" type="number" class="form-control" id="maxBudget">
            </div>
            <div class="mb-3">
              <label for="pictures" class="form-label">Pictures</label>
              <input v-model="editablePostData.pictures" type="url" class="form-control" id="pictures">
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="type">Type</label>
              <select v-model="editablePostData.type" class="form-select" id="type">
                <option selected value="">Choose...</option>
                <option v-for="category in categories" :key="category" value="">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="body" class="form-label">Description</label>
              <textarea v-model="editablePostData.description" class="form-control" id="body" rows="3"></textarea>
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