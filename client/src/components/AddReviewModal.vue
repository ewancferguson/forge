<script setup>
import { reviewsService } from '@/services/ReviewsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { useRoute } from 'vue-router';

const route = useRoute()

async function addReview() {
  try {
    const profileId = route.params.profileId
    await reviewsService.addReview(profileId)
    Pop.success()
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
          <form id="reviewForm">
            <!-- Rating -->
            <div class="mb-3">
              <label for="rating" class="form-label">Rating (1 to 5)</label>
              <select class="form-select" id="rating" name="rating" required>
                <option value="" selected disabled>Choose a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <!-- Review Text -->
            <div class="mb-3">
              <label for="reviewText" class="form-label">Your Review</label>
              <textarea class="form-control" id="reviewText" name="reviewText" rows="4"
                placeholder="Write your review here..." required></textarea>
            </div>

            <!-- Submit Button -->
            <div class="mb-3 text-end">
              <button @click="addReview()" type="submit" class="btn btn-success">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>