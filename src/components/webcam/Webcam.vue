<template>
  <div
    class="bg-image flex flex-col items-center justify-center h-screen"
    id="webcam-app"
  >
    <!-- Camera -->
    <div class="flex items-center justify-center my-5">
      <div class="h-screen">
        <video ref="webcamElement" id="webcam" autoplay playsinline></video>
        <canvas ref="canvasElement" id="canvas" class="hidden"></canvas>
        <audio ref="snapSoundElement" src="" preload="auto"></audio>
      </div>
    </div>

    <!-- Actions -->
    <div class="absolute top-5 flex items-center justify-around w-full">
      <router-link :to="{ name: 'home' }">
        <a-button type="primary" @click="exit"> Exit </a-button>
      </router-link>

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

    <div></div>

    <!-- Controls -->
    <div class="flex items-center absolute bottom-5 z-50">
      <a-button type="primary" class="" @click="toggleCamera">
        Click to {{ isOnCamera ? 'off' : 'on' }} Camera
      </a-button>

      <a-button
        v-if="isTookPhoto"
        type="primary"
        @click="resumeCamera"
        class="mx-3"
      >
        Resume camera
      </a-button>
      <a-button v-else type="primary" class="mx-3" @click="takePhoto">
        Click to take photo
      </a-button>

      <a-button type="primary" class="" @click="flipCamera">
        Flip camera
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

const isOnCamera = ref(true);
const isTookPhoto = ref(false);

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

  webcam.start();
  // console.log(webcam);
});

onUnmounted(() => {
  webcam.stop();
});

const flipCamera = () => {
  webcam.flip();
  webcam.start();
};

// const startCamera = () => {
//   webcam
//     .start()
//     .then((result: any) => {
//       // cameraStarted();
//       console.log('webcam started');
//       console.log(result);
//     })
//     .catch((err: any) => {
//       console.log('error: ' + err);
//     });
// };

const toggleCamera = () => {
  if (isOnCamera.value) {
    webcam.stop();
    isOnCamera.value = false;
  } else {
    webcam.start();
    isOnCamera.value = true;
  }
};

const beforeTakePhoto = () => {
  isTookPhoto.value = true;
};

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
  isTookPhoto.value = false;
};

const exit = () => {
  canvasElement.value.classList.add('hidden');
  webcamElement.value.classList.remove('hidden');
  webcam.stop();
};
</script>

<style scoped lang="scss">
#webcam-app {
  position: relative;
  background-image: url(../../assets/images/background.jpg);
}

#webcam {
  // display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto;
  height: 100vh;
  // z-index: 40;
  pointer-events: none;
  margin: 0 auto;
}

#canvas {
  background-color: transparent;
  position: absolute;
  // z-index: 40;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
</style>
