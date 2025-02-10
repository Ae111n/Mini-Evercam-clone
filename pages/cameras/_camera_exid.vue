<template>
  <div>
    <div class="navbar">
      <span class="camera-id"> ex-id : ({{ exid }})</span>
      <p class="camera-name">{{ selectedCamera }}</p>
      <button class="toDashboard" @click="toDashboard">
        Back to Dashboard
      </button>
    </div>
    <div ref="containerDiv" class="containerDiv">
      <img class="background-img" :src="`${imageSrc}`" />
      <div class="controls">
        <button @click="toggleFullscreen" class="material-icons">
          fullscreen
        </button>
        <button @click="play" v-if="isPaused" class="material-icons">
          play_arrow
        </button>
        <button @click="pause" v-else class="material-icons">pause</button>
      </div>
      <img
        :style="imgStyles"
        @wheel="onWheel"
        class="image"
        ref="image"
        @load="onImageLoad"
        v-show="imageLoaded"
        :src="`${imageSrc}`"
      />
      <span v-show="!imageLoaded">loading...</span>
    </div>
  </div>
</template>

<script>
import { camerasStore } from "~/store/cameras";
export default {
  components: {},
  data() {
    return {
      imageSrc: null,
      imageLoaded: false,
      intervalId: null,
      date: null,
      selectedCamera: null,
      isPaused: false,
      zoom: 1,
      originX: 0,
      originY: 0,
    };
  },
  async mounted() {
    this.selectedCamera =
      this.cameras.selectedCamera || localStorage.getItem("selectedCamera");
    if (this.selectedCamera) {
      localStorage.setItem("selectedCamera", this.selectedCamera);
    }
    await this.cameras.fetchLatestSnapshot(this.exid);
    this.imageSrc = this.cameras.imageSrc;
    this.fetchSnapshot();
  },
  computed: {
    imgStyles() {
      return {
        transform: ` scale(${this.zoom})`,
        transformOrigin: `${this.originX}% ${this.originY}%`,
      };
    },
    exid() {
      return this.$route.params.camera_exid;
    },
    lastLogin() {
      return localStorage.getItem("lastLogin");
    },
    cameras() {
      return camerasStore();
    },
  },
  methods: {
    onWheel(event) {
      event.preventDefault();
      const rect = this.$refs.containerDiv.getBoundingClientRect();
      if (event.deltaY < 0 && this.zoom < 5) {
        this.originX =
          ((event.clientX - rect.left) / event.target.clientWidth) * 100;
        this.originY =
          ((event.clientY - rect.top) / event.target.clientHeight) * 100;
        this.zoom = this.zoom * 1.1;
      } else if (event.deltaY > 0 && this.zoom > 1) {
        this.zoom = this.zoom / 1.1;
      }
    },
    toggleFullscreen() {
      const element = this.$refs.containerDiv;
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
          console.error(`Error trying to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    },
    toDashboard() {
      localStorage.removeItem("selectedCamera");
      this.$router.push("/dashboard");
    },
    onImageLoad() {
      this.imageLoaded = true;
    },
    fetchSnapshot() {
      this.intervalId = setInterval(async () => {
        await this.cameras.fetchLatestSnapshot(this.exid);
        this.imageSrc = this.cameras.imageSrc;
      }, 2000);
    },
    pause() {
      clearInterval(this.intervalId);
      this.isPaused = true;
    },
    play() {
      this.cameras.fetchLatestSnapshot(this.$route.params.camera_exid);
      this.imageSrc = this.cameras.imageSrc;
      this.isPaused = false;
      this.fetchSnapshot();
    },
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Icons");
:root {
  background-color: light-dark(rgb(210, 210, 210), rgb(52, 52, 52));
  color-scheme: light dark;
}

.material-icons {
  font-size: 44px;
  color: white;
}

* {
  box-sizing: border-box;
}

.controls {
  width: 70px;
  height: 140px;
  position: absolute;
  right: 1%;
  bottom: 2%;
  display: flex;
  flex-direction: column;
  z-index: 99;
  transition-duration: 0.4;
}

.controls button {
  background-color: rgb(59, 59, 59);
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls button:hover {
  background-color: rgb(201, 52, 52);
}

.controls button:active {
  filter: saturate(200);
}

.background-img {
  z-index: 0;
  object-fit: fill;
  filter: blur(48px);
  position: absolute;
  overflow: hidden;
}

.containerDiv {
  height: calc(100vh - 40px);
  width: 100vw;
  bottom: 0;
  position: absolute;
  background-color: light-dark;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  object-fit: scale-down;
  height: 100%;
  width: fit-content;
  position: relative;
}

.navbar {
  width: 100vw;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  box-shadow: 0px 1px 5px 0px rgba(173, 173, 173, 1);
  background-color: light-dark(rgb(210, 210, 210), rgb(52, 52, 52));
  font-size: large;
  z-index: 99;
}

.camera-id {
  font-weight: 100;
  font-style: italic;
}

.camera-name {
  margin-left: 15px;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.05cap;
}

.toDashboard {
  background-color: #094bc5;
  border-radius: 0.4rem;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 90%;
  outline: none;
  text-align: center;
  transform: translate3d(0, 0, 0);
  width: 160px;
  height: 28px;
  margin-right: 15px;
  right: 10px;
}

.toDashboard:hover {
  filter: saturate(2);
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 5px 30px,
    rgba(0, 0, 0, 0.05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}

.toDashboard:active {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0 3px 6px 0,
    rgba(0, 0, 0, 0.1) 0 0 10px 0,
    rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: 0.35s;
}
</style>
