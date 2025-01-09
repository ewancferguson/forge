<script setup>
import { reviewsService } from '@/services/ReviewsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editableReviewData = ref({
  body: '',
  rating: '',
  accountId: route.params.profileId
})

async function addReview(editableReviewData) {
  try {
    const profileId = route.params.profileId
    await reviewsService.addReview(profileId, editableReviewData)
    editableReviewData.value = {
      rating: '',
      body: ''
    };
    Modal.getInstance('#reviewModal').hide(); // Close the modal
    Pop.success('Review Created');
  }
  catch (error) {
    Pop.error(error);
    logger.error("adding a review", error)
  }
}


</script>


<template>
  <!-- Button to trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reviewModalLabel">Leave a Review</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addReview(editableReviewData)" id="reviewForm">
            <!-- Rating -->
            <div class="mb-3">
              <label for="rating" class="form-label">Rating</label>
              <input v-model="editableReviewData.rating" type="number" min=1 max=5 class="form-control" id="rating">
            </div>
            <!-- Review Text -->
            <div class="mb-3">
              <label for="reviewText" class="form-label">Your Review</label>
              <textarea v-model="editableReviewData.body" class="form-control" id="reviewText" name="reviewText"
                rows="4" placeholder="Write your review here..." required></textarea>
            </div>

            <!-- Submit Button -->
            <div class="mb-3 text-end">
              <button type="submit" class="btn btn-success">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>