<script setup>
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';

const categories = ['construction', 'manufacturing', 'maintenance', 'utilities', 'agriculture', 'skilled trades', 'other'];

const editablePostData = ref({
  minBudget: '',
  maxBudget: '',
  pictures: [], // Use an array to store image URLs
  type: '',
  body: ''
});

const newPictureUrl = ref(''); // Temporary input for new image URL

function addPicture() {
  if (newPictureUrl.value.trim()) {
    editablePostData.value.pictures.push(newPictureUrl.value.trim());
    newPictureUrl.value = ''; // Clear input after adding
  }
}

function removePicture(index) {
  editablePostData.value.pictures.splice(index, 1);
}

async function createListing() {
  try {
    logger.log(editablePostData.value);
    await postsService.createListing(editablePostData.value);
    editablePostData.value = {
      minBudget: '',
      pictures: [],
      maxBudget: '',
      type: '',
      body: ''
    };
    Modal.getInstance('#createPostModal').hide();
    Pop.success('Listing Created');
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="modal" id="createPostModal" tabindex="-1">
    <form @submit.prevent="createListing()">
      <div class="modal-dialog modal-lg">
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
              <input v-model="editablePostData.minBudget" min="0" type="number" class="form-control" id="minBudget">
            </div>
            <div class="mb-3">
              <label for="maxBudget" class="form-label">Max Budget</label>
              <input v-model="editablePostData.maxBudget" max="100000" type="number" class="form-control"
                id="maxBudget">
            </div>
            <div class="mb-3">
              <label for="pictures" class="form-label">Pictures</label>
              <div class="d-flex align-items-start">
                <input v-model="newPictureUrl" type="url" class="form-control me-2" placeholder="Add picture URL">
                <button type="button" class="btn btn-primary" @click="addPicture">Add</button>
              </div>
              <div class="mt-3 d-flex flex-wrap gap-3">
                <div v-for="(picture, index) in editablePostData.pictures" :key="index" class="position-relative">
                  <img :src="picture" class="rounded border" style="width: 150px; height: 100px; object-fit: cover;"
                    :alt="'Picture ' + (index + 1)">
                  <button type="button" class="btn-close position-absolute top-0 end-0 remove-btn"
                    @click="removePicture(index)" aria-label="Remove"></button>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="type">Type</label>
              <select v-model="editablePostData.type" class="form-select" id="type">
                <option selected value="">Choose...</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="body" class="form-label">Description</label>
              <textarea v-model="editablePostData.body" class="form-control" id="body" rows="3"></textarea>
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

<style lang="scss" scoped>
.modal-lg {
  max-width: 900px;
  /* Larger modal for better layout */
}

.remove-btn {
  color: #000;
  /* Default color */
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: red;
  /* Red color on hover */
}
</style>
