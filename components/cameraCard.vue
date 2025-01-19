<template>
     <div class="card" @click="toLiveView()" >
          <img :src="`https://media.evercam.io/v2/cameras/${camera.exid}/thumbnail?authorization=${token}`">
          <span class="status status-online" v-show="camera.is_online">online</span>
          <span class="status status-offline" v-show="!camera.is_online">offline</span>
          <h1 required class="h1">{{ camera.name }}</h1>
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
    toLiveView() {
     this.$router.push(`/cameras/${this.camera.exid}`);
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
     width: 600px;
     height: 400px;
     overflow: hidden;
     border-radius: 0.5rem;
     background-color: white;
     box-shadow: 0px 4px 7px 0px rgba(173, 173, 173, 1);
     margin: 8px 0;
     transition: all .3s;
     font-weight: 500;
     cursor: pointer;
     position: relative;
}

.card:hover {
     filter:saturate(1.5);
     transform: translateY(-3px);
}

img {
     width: 100%;
     height: 100%;
     object-fit: contain;
     image-resolution: from-image 300dpi;
}
.status{
     top: 12px;
     right: 12px;
     position: absolute;
     font-size: large;
     font-weight: 300;
     border-radius: 1rem;
     width: 70px;
     height: 30px;
     text-align: center;
}
.status-online{
     background-color: rgba(159, 218, 158, 0.701);
     color: rgb(7, 93, 7);border: 1px solid rgb(7, 93, 7);
}
.status-offline{
     background-color: rgba(218, 158, 158, 0.701);
     color: rgb(93, 7, 7);border: 1px solid rgb(93, 7, 7);
}
</style>