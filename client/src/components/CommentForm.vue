<script setup>
import { commentService } from '@/services/CommentService';
import Pop from '@/utils/Pop';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editableCommentData = ref({
  body: '',
  listingId: route.params.listingId
})


async function createComment() {
  try {
    await commentService.createComment(editableCommentData.value)
    Pop.success('Comment Created')
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>

<template>
  <form @submit.prevent="createComment()">
    <textarea v-model="editableCommentData.body" type="text"
      class="form-control p-3 bg-light text-dark form-control text-primary rounded mx-2" id="input"
      placeholder="Add a Comment..." rows="5"></textarea>
    <div class="text-end mt-3">
      <button class="btn btn-primary">Post Comment</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>