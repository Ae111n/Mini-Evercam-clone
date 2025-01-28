<template>
  <div>
    <div class="navbar">
      <span class="camera-id"> ex-id : ({{ exid }})</span>
      <p class="camera-name">{{ selectedCamera }}</p>
      <button class="toDashboard" @click="toDashboard">Back to Dashboard</button>
    </div>
    <div ref="containerDiv" class="containerDiv">
      <img class="background-img" :src="`${imageSrc}`">
      <div class="controls">
        <button @click="toggleFullscreen" class="material-icons">fullscreen</button>
        <button @click="play" v-if="isPaused" class="material-icons">play_arrow</button>
        <button @click="pause" v-else class="material-icons">pause</button>
      </div>
      <img class="image" ref="image" @load="onImageLoad" v-show="imageLoaded" :src="`${imageSrc}`">
      <!-- @wheel="onWheel" :style="imageStyles" -->
      <span v-show="!imageLoaded">loading...</span>
    </div>
  </div>
</template>

<script>
import { camerasStore } from '~/store/cameras';
export default {
  components: {

  },
  data() {
    return {
      imageSrc: null,
      imageLoaded: false,
      intervalId: null,
      date: null,
      selectedCamera: null,
      isPaused: false,

      /*       zoom: 1, 
            originX: 50, 
            originY: 50, */
    }
  },
  async mounted() {
    if (this.cameras.selectedCamera) {
      this.selectedCamera = this.cameras.selectedCamera,
        localStorage.setItem('selectedCamera', this.selectedCamera)
    } else if (!this.cameras.selectedCamera && !this.selectedCamera) {
      this.selectedCamera = localStorage.getItem('selectedCamera')
    }
    await this.cameras.fetchLatestSnapshot(this.$route.params.camera_exid)
    this.imageSrc = this.cameras.imageSrc
    this.fetchSnapshot()
  },
  computed: {
    /*     imageStyles() {
          return {
            transform: `scale(${this.zoom})`,
            transformOrigin: `${this.originX}% ${this.originY}%`, 
          };
        }, */
    exid() {
      return this.$route.params.camera_exid
    },
    lastLogin() {
      return localStorage.getItem('lastLogin')
    },
    cameras() {
      return camerasStore()
    },
  },
  methods: {
    /*     onWheel(event) {
          event.preventDefault();
          if (event.deltaY < 0 && this.zoom < 4) {
            const rect = this.$refs.image.getBoundingClientRect();
            this.originX = ((event.clientX - rect.left) / rect.width) * 100;
            this.originY = ((event.clientY - rect.top) / rect.height) * 100;
            console.log(rect, event.clientX, event.clientY)
            this.zoom += 0.1; // Zoom in
          }
          else if (event.deltaY > 0 && this.zoom > 1) {
            this.zoom -= 0.1; // Zoom out
          }
        },  */
    toggleFullscreen() {
      const element = this.$refs.containerDiv;
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
          console.error(`Error trying to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    },
    toDashboard() {
      localStorage.removeItem('selectedCamera');
      this.$router.push('/dashboard')
    },
    onImageLoad() {
      this.imageLoaded = true;
    },
    fetchSnapshot() {

      this.intervalId = setInterval(
        async () => {
          await this.cameras.fetchLatestSnapshot(this.exid)
          this.imageSrc = this.cameras.imageSrc
        }, 2000
      )
    },
    pause() {
      clearInterval(this.intervalId);
      this.isPaused = true;
    },
    play() {
      this.cameras.fetchLatestSnapshot(this.$route.params.camera_exid)
      this.imageSrc = this.cameras.imageSrc
      this.isPaused = false
      this.fetchSnapshot()
    }
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Icons');

.material-icons {
  font-size: 44px;
  color: white;
}

* {
  box-sizing: border-box;
}

.controls {
  background-color: rgb(71, 68, 68);
  width: 70px;
  height: 250px;
  position: absolute;
  right: 1%;
  bottom: 1%;
  display: flex;
  flex-direction: column;
  z-index: 99;
  transition-duration: .4;
}

.controls button {
  background-color: grey;
  width: 100%;
  height: 25%;
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
  background-color: rgb(209, 209, 209);
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
  position: fixed;
  top: 0;
  box-shadow: 0px 2px 5px 0px rgba(173, 173, 173, 1);
  background: rgb(219, 219, 219);
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
  letter-spacing: .05cap;
}

.toDashboard {
  background-color: #094bc5;
  border-radius: .4rem;
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
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.toDashboard:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}
</style>