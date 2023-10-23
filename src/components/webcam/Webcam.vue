<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen"
    id="webcam-app"
  >
    <a-button type="primary" @click="startCamera">
      Click to Start Camera
    </a-button>

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
      <a-button type="primary" @click="exit">Exit</a-button>
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
import { onMounted, ref } from 'vue';
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
  // console.log(webcam);

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

<style lang="scss ">
#webcam-app {
  background-image: url(../../assets/images/background.jpg);
  background-color: black;
  background-position: center center;
  background-repeat: no-repeat;
}

#cameraFlip {
  cursor: pointer;
  background-color: black;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/camera_flip_white.png);
}
</style>
