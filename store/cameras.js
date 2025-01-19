import { defineStore } from 'pinia';
export const camerasStore = defineStore('cameras', {

     state: () => ({
          cameras: [],
          selectedCamera: null,
          loading: false,
          error: null,
          imageSrc: null
     }),
     actions: {
          async fetchCameras() {
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get('/cameras');
                    const cameras = response.data.cameras;
                    this.cameras = cameras;
                    console.log(this.cameras);
                    this.error = null;
               }
               catch (error) {
                    console.log(error)
                    this.error = error;
               }
          },
          async fetchLatestSnapshot(cameraId) {
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get(`/cameras/${cameraId}/recordings/snapshots/latest`);
                    this.imageSrc = response.data.data;
                    this.error = null
               }
               catch (error) {
                    console.log(error)
                    this.error = error
               }
          },
     }
})