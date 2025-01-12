<template>
     <div class="card" @click="fetchLatestSnapshot()" >
          <img :src="`https://media.evercam.io/v2/cameras/${camera.exid}/thumbnail?authorization=${token}`">
          <h1 class="h1">{{ camera.name }}</h1>
     </div>
</template>

<script>
import { camerasStore } from '~/store/cameras';
export default {
     
     name: "cameraCard",
     props: {
          camera: {
               type: Object,
               required: true,
          },
          token: {
               type: String,
               required: true,
          }
     },
     computed: {
    cameras() {
      return camerasStore()
    },},
    methods:{
     fetchLatestSnapshot(){
      this.cameras.fetchLatestSnapshot(this.camera.exid)
    }
    }
}
</script>

<style>
.h1 {
     font-size: 20px;
     height: 20%;
     width: 100%;
     padding: .8rem;
}

.card {
     display: flex;
     flex-direction: column;
     width: 540px;
     height: 360px;
     overflow: hidden;
     border-radius: 0.7rem;
     background-color: white;
     box-shadow: 0px 4px 7px 0px rgba(173, 173, 173, 1);
     margin: 18px;
     transition: all .1s;
     font-weight: bold;
     cursor: pointer;
}

.card:hover {
     font-weight: normal;
}

img {
     width: 100%;
     height: 100%;
     object-fit: contain;
     image-resolution: from-image 300dpi;
}
</style>