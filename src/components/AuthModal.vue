<template>
  <!-- Login Modal -->
  <div v-if="authStore.showLoginModal" class="modal-overlay" @click="authStore.closeModals">
    <div class="modal" @click.stop>
      <h2 class="modal-title">Login to EduLearn</h2>
      <form @submit.prevent="authStore.login">
        <div class="form-group">
          <label>Email</label>
          <input v-model="authStore.loginForm.email" type="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="authStore.loginForm.password" type="password" class="form-control" required>
        </div>
        <div class="modal-actions">
          <button type="button" @click="authStore.closeModals" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Signup Modal -->
  <div v-if="authStore.showSignupModal" class="modal-overlay" @click="authStore.closeModals">
    <div class="modal" @click.stop>
      <h2 class="modal-title">Join EduLearn</h2>
      <form @submit.prevent="authStore.signup">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="authStore.signupForm.name" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="authStore.signupForm.email" type="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="authStore.signupForm.password" type="password" class="form-control" required>
        </div>
        <div class="modal-actions">
          <button type="button" @click="authStore.closeModals" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores'

export default {
  name: 'AuthModal',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  }
}
</script>

<style scoped>
.modal-title {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>