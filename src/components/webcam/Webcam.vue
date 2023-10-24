<template>
  <div
    class="bg-image flex flex-col items-center justify-center min-h-screen"
    id="webcam-app"
  >
    <div class="flex items-center">
      <a-button type="primary" @click="startCamera">
        Click to Start Camera
      </a-button>

      <a-button type="primary" class="ml-3" @click="flipCamera">
        Flip camera
      </a-button>
    </div>

    <div class="flex items-center justify-center my-5">
      <div class="border-2">
        <video ref="webcamElement" autoplay playsinline></video>
        <canvas ref="canvasElement" class="hidden"></canvas>
        <audio ref="snapSoundElement" src="" preload="auto"></audio>
      </div>
    </div>

    <a-button type="primary" class="mb-5" @click="takePhoto">
      Click to take photo
    </a-button>

    <div id="cameraControls" class="flex items-center justify-item">
      <router-link :to="{ name: 'home' }">
        <a-button type="primary" @click="exit"> Exit </a-button>
      </router-link>
      <a-button type="primary" @click="resumeCamera" class="mx-3">
        Resume camera
      </a-button>
      <a-button type="primary">
        <a
          ref="downloadElement"
          href="#"
          download="user.png"
          target="_blank"
          title="Save Photo"
        >
          Save
        </a>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import Webcam from './webcam';

const webcamElement = ref();
const canvasElement = ref();
const snapSoundElement = ref();
const downloadElement = ref();

let webcam: any;
onMounted(() => {
  // console.log(webcamElement.value);
  // console.log(canvasElement.value);
  // console.log(snapSoundElement.value);
  // console.log(downloadElement.value);
  // console.log(capturedImageElement.value);

  if (webcamElement.value && canvasElement.value && snapSoundElement.value) {
    webcam = new Webcam(
      webcamElement.value,
      'user',
      canvasElement.value,
      snapSoundElement.value,
    );
  }

  // console.log(webcam);
});

onUnmounted(() => {
  webcam.stop();
});

const flipCamera = () => {
  webcam.flip();
  webcam.start();
};

const startCamera = () => {
  webcam
    .start()
    .then((result: any) => {
      // cameraStarted();
      console.log('webcam started');
      console.log(result);
    })
    .catch((err: any) => {
      console.log('error: ' + err);
    });
};

const beforeTakePhoto = () => {};

const afterTakePhoto = () => {
  canvasElement.value.classList.remove('hidden');
  webcamElement.value.classList.add('hidden');
  webcam.stop();
};

const takePhoto = () => {
  beforeTakePhoto();
  let picture = webcam.snap();
  console.log(picture);
  downloadElement.value.href = picture;
  afterTakePhoto();
};

const resumeCamera = () => {
  canvasElement.value.classList.add('hidden');
  webcamElement.value.classList.remove('hidden');
  webcam.start();
};

const exit = () => {
  canvasElement.value.classList.add('hidden');
  webcamElement.value.classList.remove('hidden');
  webcam.stop();
};
</script>

<style scoped lang="scss">
#webcam-app {
  background-image: url(../../assets/images/background.jpg);
}
</style>
