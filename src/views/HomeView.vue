<template>
  <!-- <div class="text-4xl font-medium">Home Page</div> -->
  <div class="w-full">
    <Webcam></Webcam>
  </div>
  <!-- <video
    ref="camera"
    autoplay
  ></video>
  <button @click="captureImage">Chụp ảnh</button>
  <img ref="capturedImage" />
  <button @click="uploadImage">Gửi ảnh</button> -->
</template>

<script setup lang="ts">
import Webcam from '@/components/webcam/Webcam.vue';
// import { ref } from 'vue';

// const camera = ref(null);
// const capturedImage = ref(null);

// // Lấy quyền truy cập camera
// navigator.mediaDevices
//   .getUserMedia({ video: true })
//   .then(function (stream) {
//     if (camera.value) {
//       camera.value.srcObject = stream;
//     }
//   })
//   .catch(function (error) {
//     console.error('Lỗi truy cập camera: ', error);
//   });

// const captureImage = () => {
//   console.log(camera.value.srcObject);
//   capturedImage.value.src = URL.createObjectURL(camera.value.srcObject);
// };

// const uploadImage = () => {
//   // Xử lý gửi ảnh
// };
</script>

<style scoped lang=""></style>
