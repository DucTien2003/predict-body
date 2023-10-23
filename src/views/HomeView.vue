<template>
  <div class="text-4xl font-medium">Home Page</div>
  <video
    id="camera"
    autoplay
  ></video>
  <button id="captureButton">Chụp ảnh</button>
  <img
    id="capturedImage"
    style="display: none"
  />
  <button
    id="uploadButton"
    style="display: none"
  >
    Gửi ảnh
  </button>
</template>

<script setup lang="">
// Lấy quyền truy cập camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    const video = document.getElementById('camera');
    video.srcObject = stream;
  })
  .catch(function (error) {
    console.error('Lỗi truy cập camera: ', error);
  });
</script>

<style lang=""></style>
