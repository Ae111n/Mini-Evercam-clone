import { defineStore } from 'pinia';
export const camerasStore = defineStore('cameras', {

     state: () => ({
          cameras: [],
          selectedCamera: null,
          loading: false,
          error: null,
          imageSrc:null
     }),
     actions: {
          async fetchCameras() {
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get('/cameras');
                    const cameras = response.data.cameras;
                    this.cameras=cameras ;
                    console.log(this.cameras);
               }
               catch (error) {
                    console.log(error)
               }
          },
          async fetchLatestSnapshot(cameraId){
               const axios = this.$nuxt.$axios;
               try {
                    const response = await axios.get(`/cameras/${cameraId}/recordings/snapshots/latest`);
                      console.log(response)
                      this.imageSrc=response.data.data
               }
               catch (error) {
                    console.log(error)
               }
//   * Return the response.data.data (base64 image)
          }


     }
})