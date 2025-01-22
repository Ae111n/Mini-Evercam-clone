<template>
  <div>
    <div id="navbar">
      <span class="camera-id"> ex-id : ({{ exid }})</span>
      <p class="camera-name">{{ selectedCamera }}</p>
      <button id="toDashboard" @click="toDashboard">Back to Dashboard</button>
    </div>
    <div class="containerDiv">
      <img id="background-img" :src="`${imageSrc}`">
      <img id="image" @load="onImageLoad" v-show="imageLoaded" :src="`${imageSrc}`">
      <span v-show="!imageLoaded">loading...</span>
    </div>
  </div>
</template>

<script>
import { camerasStore } from '~/store/cameras';


export default {
  data() {
    return {
      imageSrc: null,
      imageLoaded: false,
      intervalId: null,
      date: null,
      selectedCamera:null,
    }
  },
  async mounted() {
    if(this.cameras.selectedCamera){
       this.selectedCamera = this.cameras.selectedCamera,
      localStorage.setItem('selectedCamera', this.selectedCamera)
    }else if(!this.cameras.selectedCamera && !this.selectedCamera){
      this.selectedCamera=localStorage.getItem('selectedCamera')
    }
    await this.cameras.fetchLatestSnapshot(this.$route.params.camera_exid)
    this.imageSrc = this.cameras.imageSrc
    this.fetchSnapshot()
  },
  computed: {
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
        }, 5000
      )
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
* {
  box-sizing: border-box;
}

#background-img {
  z-index: 0;
  object-fit: fill;
  filter: blur(48px);
  position: absolute;
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

#image {
  object-fit: scale-down;
  height: 100%;
  width: fit-content;
  position: relative;
}

#navbar {
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

#toDashboard {
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

#toDashboard:hover {
  filter: saturate(2);
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

#toDashboard:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}
</style>