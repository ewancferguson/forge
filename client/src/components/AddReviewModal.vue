<script setup>
import { reviewsService } from '@/services/ReviewsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const editableReviewData = ref({
  body: '',
  rating: 0, // Initialize rating as a number
  accountId: route.params.profileId
});

async function addReview(editableReviewData) {
  try {
    const profileId = route.params.profileId;
    await reviewsService.addReview(profileId, editableReviewData);
    editableReviewData.value = {
      rating: 0,
      body: ''
    };
    Modal.getInstance('#reviewModal').hide();
    Pop.success('Review Created');
  } catch (error) {
    Pop.error(error);
    logger.error("adding a review", error);
  }
}


function setRating(value) {
  editableReviewData.value.rating = value;
}
</script>

<template>

  <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reviewModalLabel">Leave a Review</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addReview(editableReviewData)" id="reviewForm">

            <div class="mb-3">
              <label class="form-label">Rating</label>
              <div class="rating">
                <input value="5" name="rating" id="star5" type="radio" @click="setRating(5)" />
                <label for="star5"></label>
                <input value="4" name="rating" id="star4" type="radio" @click="setRating(4)" />
                <label for="star4"></label>
                <input value="3" name="rating" id="star3" type="radio" @click="setRating(3)" />
                <label for="star3"></label>
                <input value="2" name="rating" id="star2" type="radio" @click="setRating(2)" />
                <label for="star2"></label>
                <input value="1" name="rating" id="star1" type="radio" @click="setRating(1)" />
                <label for="star1"></label>
              </div>
            </div>

            <div class="mb-3">
              <label for="reviewText" class="form-label">Your Review</label>
              <textarea v-model="editableReviewData.body" class="form-control" id="reviewText" name="reviewText"
                rows="4" placeholder="Write your review here..." required></textarea>
            </div>

            <div class="mb-3 text-end">
              <button type="submit" class="btn btn-success">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* From Uiverse.io by PriyanshuGupta28 */
.rating {
  display: inline-block;
}

.rating input {
  display: none;
}

.rating label {
  float: right;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.rating label:before {
  content: '\2605';
  font-size: 30px;
}

.rating input:checked~label,
.rating label:hover,
.rating label:hover~label {
  color: #6f00ff;
  transition: color 0.3s;
}
</style>
