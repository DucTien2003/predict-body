<template>
  <div class="text-4xl font-medium">Home Page</div>
  <video
    ref="camera"
    autoplay
  ></video>
  <button @click="captureImage">Chụp ảnh</button>
  <img
    ref="capturedImage"
    style="display: none"
  />
  <button
    @click="uploadImage"
    style="display: none"
  >
    Gửi ảnh
  </button>
</template>

<script setup lang="js">
import { ref } from 'vue';

const camera = ref(null);
const capturedImage = ref(null);

// Lấy quyền truy cập camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    if (camera.value.) {
      camera.value.srcObject = stream;
    }
  })
  .catch(function (error) {
    console.error('Lỗi truy cập camera: ', error);
  });

const captureImage = () => {
  // Xử lý chụp ảnh
};

const uploadImage = () => {
  // Xử lý gửi ảnh
};
</script>

<style scoped>
/* Thêm các kiểu CSS theo ý muốn */
</style>
