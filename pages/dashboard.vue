<template>
  <div>
    <h1>Welcome to the dashboard </h1>
    <h2>Logged in as : {{this.storedFullName}}</h2>
    <button @click="this.user.clearAuth">Logout</button>
  </div>
</template>

<script>
import { userStore } from '~/store/user';

export default {
  middleware: 'auth',
  computed: {
    user() {
      return userStore()
    },
    storedFullName() { return localStorage.getItem('user_fullName')
  }
  },
}
</script>


<style></style>