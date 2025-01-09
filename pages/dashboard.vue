<template>
  <div>
    <h1>Welcome to the dashboard </h1>
    <h2>Logged in as : {{ storedFullName }}</h2>
    <button @click="user.clearAuth">Logout</button>

    <cameraCard v-for="camera in camerasList" :key="camera.id" :camera="camera"/>

  </div>
</template>

<script>
import { camerasStore } from '~/store/cameras';
import { userStore } from '~/store/user';
export default {
  middleware: 'auth',
  mounted() {
    this.cameras.fetchCameras()
  },


  computed: {
    cameras() {
      return camerasStore()
    },

    camerasList() {
      return camerasStore().cameras;
    },

    user() {
      return userStore();
    },
    storedFullName() { return localStorage.getItem('user_fullName') },
  },
  methods: {

  }
}
</script>


<style></style>