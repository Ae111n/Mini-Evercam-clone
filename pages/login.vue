<template>
  <div>

    <form @submit.prevent="initLogin" class="login">
      <input v-model="userEmail" required placeholder="email" type="email">
      <br>
      <input v-model="userPassword" required placeholder="password" type="password">
      <br>
      <button type="submit">login</button>
      <h3>{{ user.user }}</h3>
    </form>
  </div>

</template>

<script>
import { userStore } from '~/store/user';
export default {
  name: 'loginPage',
  setup() {
    const user = userStore();
    return { user };
  },

  data() {
    return {
      userEmail: '',
      userPassword: ''
    }
  },
  methods: {
    initLogin() {
      this.user.user = {
        username: this.userEmail,
        password: this.userPassword
      }
    }
  }
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
