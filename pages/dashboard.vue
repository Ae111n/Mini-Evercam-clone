<template>
  <div class="dashboard">
    <div id="navbar">
      <h2 class="username">Logged in as : {{ storedFullName }}</h2>
      <h2 class="cameraCount">{{ camerasList.length }} cameras available..</h2>
      <button id="logout" @click="user.clearAuth">Logout</button>
    </div>
    <div class="container-div">
      <cameraCard v-for="camera in camerasList" :key="camera.id" :token="user.token" :camera="camera" />
    </div>
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
      return  camerasStore()
    },

    camerasList() {
      return camerasStore().cameras;
    },

    user() {
      return userStore();
    },
    storedFullName() { return localStorage.getItem('user_fullName') },
  },
}
</script>
<style>
html {
  transition: all .2s;
  background-color: rgb(210, 210, 210);

}

#navbar {
  width: 100vw;
  height: 40px;
  display: flex;
  position: fixed;
  box-shadow: 0px 2px 5px 0px rgba(173, 173, 173, 1);
  background: rgb(219, 219, 219);
  font-size: large;
  top: 0;
  z-index: 1;
}

.title {
  text-align: center;
  margin: auto;
  font-size: 34px;
  font-weight: bold;
}

.username {
  margin: auto auto auto 24px;
}

.cameraCount {
  margin: auto auto auto 130px;
}

.container-div {
  height: 100vh;
  width: 96vw;
  padding: 0;
  margin: 5vh auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#logout {
  background-color: #d82020f5;
  border-radius: .4rem;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  outline: none;
  text-align: center;
  transform: translate3d(0, 0, 0);
  width: 80px;
  height: 28px;
  margin: auto 18px auto auto;
}

#logout:hover {
  filter:saturate(2);
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

#logout:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}

#logout:active:after {
  opacity: 1;
}
</style>