<template>
  <div>

    <form @submit.prevent="initLogin" class="login">
      <input v-model="userEmail" required placeholder="email" type="email">
      <br>
      <input v-model="userPassword" required placeholder="password" type="password">
      <br>
      <button type="submit">login</button>
      <h2 v-show="user.loading === true">loading...</h2>
    </form>
  </div>

</template>

<script>
import { userStore } from '~/store/user';
export default {
  name: 'loginPage',

  data() {
    return {
      userEmail: '',
      userPassword: '',
    }
  },

  computed: {
    user() {
      return userStore()
    },
  },

  methods: {
    initLogin() {
      this.user.login(this.userEmail, this.userPassword)
      
    },


  },
}

</script>
<style>
.login {
  border: 1px solid black;
  width: 600px;
  height: 270px;
  margin: 10% auto;
  display: flex;
  flex-direction: column;
}

input {
  width: 90%;
  height: 46px;
  margin: 20px auto 0 auto;
}

button {
  width: 100px;
  height: 44px;
  margin: 10px auto auto auto;
}
</style>
