import { defineStore } from 'pinia';
export const camerasStore = defineStore('cameras', {

     State: () => ({
          cameras: [],
          selectedCamera: null,
          loading: false,
          error: null
     }),
     actions: {
          async fetchCameras() {
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get('/cameras');
                    const cameras = response.data.cameras
                    this.cameras=cameras ;
                    console.log(this.cameras)
               }
               catch (error) {
                    console.log(error)
               }
          },

     }
})