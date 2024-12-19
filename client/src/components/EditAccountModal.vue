<script setup>
import { accountService } from '@/services/AccountService';
import Pop from '@/utils/Pop';
import { ref } from 'vue';





const editableAccountData = ref({
  name: '',
  picture: '',
  coverImg: '',
  linkedIn: '',
  facebook: '',
  website: '',
  isBuisness: false
})


async function editAccount() {
  try {
    await accountService.editAccount(editableAccountData.value)
    Pop.success
  }
  catch (error) {
    Pop.error(error);
  }
}




</script>


<template>
  <form @submit.prevent="editAccount()">
    <div class="modal fade" id="editAccountModal" tabindex="-1" aria-labelledby="editAccountModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="editAccountModalLabel">Edit Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="editableAccountData.name" type="text" class="form-control" id="name"
                placeholder="Enter your name">
            </div>

            <div class="mb-3">
              <label for="profilePicture" class="form-label">Profile Picture</label>
              <input v-model="editableAccountData.picture" type="url" class="form-control" id="profilePicture">
            </div>

            <div class="mb-3">
              <label for="coverImage" class="form-label">Cover Image</label>
              <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImage">
            </div>

            <div class="mb-3">
              <label for="linkedIn" class="form-label">LinkedIn Profile</label>
              <input v-model="editableAccountData.linkedIn" type="url" class="form-control" id="linkedIn"
                placeholder="https://linkedin.com/in/username">
            </div>

            <div class="mb-3">
              <label for="facebook" class="form-label">Facebook Profile</label>
              <input v-model="editableAccountData.facebook" type="url" class="form-control" id="facebook"
                placeholder="https://facebook.com/username">
            </div>

            <div class="mb-3">
              <label for="companyWebsite" class="form-label">Company Website</label>
              <input v-model="editableAccountData.website" type="url" class="form-control" id="companyWebsite"
                placeholder="https://company.com">
            </div>

            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="isBusinessAccount">
              <label class="form-check-label" for="isBusinessAccount">
                This is a business account
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <!-- Close Button -->
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>