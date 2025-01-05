<template>
  <div>
    <h1>DASHBOARD</h1>
    <button @click="this.user.clearAuth">clearAuth</button>
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
  },
}
</script>


<style></style>