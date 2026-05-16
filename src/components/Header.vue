<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">EduLearn</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/courses" class="nav-link">Courses</router-link>
        <router-link to="/dashboard" class="nav-link" v-if="authStore.isAuthenticated">Dashboard</router-link>
        <router-link to="/profile" class="nav-link" v-if="authStore.isAuthenticated">Profile</router-link>
      </div>
      <div class="auth-buttons">
        <template v-if="!authStore.isAuthenticated">
          <button @click="authStore.showLoginModal = true" class="btn btn-secondary">Login</button>
          <button @click="authStore.showSignupModal = true" class="btn btn-primary">Sign Up</button>
        </template>
        <template v-else>
          <span class="nav-link">Welcome, {{ authStore.user.name }}!</span>
          <button @click="authStore.logout" class="btn btn-secondary">Logout</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '../stores'

export default {
  name: 'Header',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  }
}
</script>