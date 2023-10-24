<template>
  <div class="bg-image bg-banner">
    <!-- Header -->
    <header
      class="bg-black flex items-center justify-between py-3 px-16 bg-opacity-40"
    >
      <span class="primary-linear font-bold text-3xl">PredictBody</span>

      <!-- Navbar -->
      <div></div>

      <!-- Sign in-up -->
      <div class="flex items-center justify-center">
        <a-button type="primary" ghost class="primary-btn-1">
          Sign in
        </a-button>
        <a-button type="primary" ghost class="primary-btn-2 ml-2">
          Sign up
        </a-button>
      </div>
    </header>

    <!-- Body -->
    <div class="flex items-center justify-center">
      <router-link :to="{ name: 'webcam' }">
        <a-button type="primary" class="mt-20 py-8 px-16 text-xl opacity-95">
          Start Free Trial
        </a-button>
      </router-link>
    </div>

    <!-- Footer -->
    <footer></footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bg-banner {
  height: 700px;
  background-image: url('../assets/images/home/background2.jpg');
}
</style>
