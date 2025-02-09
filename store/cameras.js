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
          async fetchCameras(axios) {
               try {
                    const response = await axios.get('/cameras');
                    const cameras = response.data.cameras;
                    this.cameras = cameras;
                    if (this.error) {
                         this.error = null
                    }
               }
               catch (error) {
                    console.log(error)
                    this.error = error;
                    window.location.reload()
               }
          },
          async fetchLatestSnapshot(exId) {
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get(`/cameras/${exId}/recordings/snapshots/latest`);
                    this.imageSrc = response.data.data;
                    if (this.error) {
                         this.error = null
                    }
               }
               catch (error) {
                    console.log(error)
                    this.error = error
               }
          },
     }
})