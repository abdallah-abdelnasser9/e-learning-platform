<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <AuthModal />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import AuthModal from './components/AuthModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    AuthModal
  }
}
</script>