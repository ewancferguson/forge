<script setup>

</script>


<template>
  <div class="modal fade" id="editAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container mt-5">
            <div class="card shadow">
              <div class="card-header text-center bg-primary text-white">
                <h3>Edit Account</h3>
              </div>
              <div class="card-body">
                <form>
                  <!-- Name Field -->
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter your name">
                  </div>

                  <!-- Profile Picture Field -->
                  <div class="mb-3">
                    <label for="profilePicture" class="form-label">Profile Picture</label>
                    <input type="file" class="form-control" id="profilePicture">
                  </div>

                  <!-- Cover Image Field -->
                  <div class="mb-3">
                    <label for="coverImage" class="form-label">Cover Image</label>
                    <input type="file" class="form-control" id="coverImage">
                  </div>

                  <!-- LinkedIn Field -->
                  <div class="mb-3">
                    <label for="linkedIn" class="form-label">LinkedIn Profile</label>
                    <input type="url" class="form-control" id="linkedIn" placeholder="https://linkedin.com/in/username">
                  </div>

                  <!-- Facebook Field -->
                  <div class="mb-3">
                    <label for="facebook" class="form-label">Facebook Profile</label>
                    <input type="url" class="form-control" id="facebook" placeholder="https://facebook.com/username">
                  </div>

                  <!-- Company Website Field -->
                  <div class="mb-3">
                    <label for="companyWebsite" class="form-label">Company Website</label>
                    <input type="url" class="form-control" id="companyWebsite" placeholder="https://company.com">
                  </div>

                  <!-- Business Account Checkbox -->
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="isBusinessAccount">
                    <label class="form-check-label" for="isBusinessAccount">
                      This is a business account
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary w-50">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>