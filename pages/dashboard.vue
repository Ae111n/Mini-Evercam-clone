<template>
  <div class="dashboard">
    <div id="navbar">
      <h2 class="username">Logged in as : {{ storedFullName }}</h2>
      <h2 class="loginDate">
        Last login :<span class="date"> {{ lastLogin }}</span>
      </h2>
      <button id="logout" @click="user.clearAuth">Logout</button>
    </div>

    <div class="container-div">
      <div class="title">
      <h2 class="cameraCount">{{ camerasList.length }} cameras available..</h2>
</div>
      <div class="grid">
              <cameraCard
        v-for="camera in camerasList"
        :key="camera.id"
        :token="user.token"
        :camera="camera"
      />
      </div>

    </div>
  </div>
</template>

<script>
import { camerasStore } from "~/store/cameras";
import { userStore } from "~/store/user";
export default {
  middleware: "auth",
  data() {
    return {
      lastLogin: null,
    };
  },
  mounted() {
    this.lastLogin = localStorage.getItem("lastLogin");
    this.cameras.fetchCameras(this.$nuxt.$axios);
  },
  computed: {
    cameras() {
      return camerasStore();
    },

    camerasList() {
      return camerasStore().cameras;
    },

    user() {
      return userStore();
    },
    storedFullName() {
      return localStorage.getItem("user_fullName");
    },
  },
};
</script>
<style>
:root{
  background-color: light-dark(rgb(210, 210, 210),rgb(52, 52, 52));
  color-scheme: light dark;
}
html {
  transition: all 0.2s;
}

#navbar {
  width: 100vw;
  height: 40px;
  display: flex;
  position: fixed;
  box-shadow: 0px 1px 5px 0px rgba(173, 173, 173, 1);
  background: light-dark;
  font-size: large;
  top: 0;
  z-index: 1;
}

.cameraCount {
  width: fit-content;
  margin: auto;
  height: 35px;
  font-size: 20px;
}

.username {
  margin: auto auto auto 24px;
  letter-spacing: 0.05cap;
  font-weight: 400;
}

.loginDate {
  margin: auto auto auto 4%;
}

.date {
  font-style: italic;
  font-weight: 100;
}

.container-div {
  width: 96vw;
  margin: 5vh auto;
}
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(435px, 1fr));
  gap: 16px;
}
#logout {
  background-color: #d82020f5;
  border-radius: 0.4rem;
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
  filter: saturate(2);
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}

#logout:active {
  box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0,
    rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: 0.35s;
}

#logout:active:after {
  opacity: 1;
}
</style>
