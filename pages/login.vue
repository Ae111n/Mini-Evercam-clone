<template>
  <div>
    <form @submit.prevent="initLogin" class="login">
      <h1>Welcome to Evercam</h1>
      <p>Sign in to your account</p>
      <label for="username">Username </label>
      <input v-model="username" id="username" required placeholder="Enter your username" type="email">

      <label for="password">Password </label>
      <input v-model="Password" id="password" required placeholder="Enter your password" type="password">

      <button id="signIn" type="submit">Sign in</button>
    </form>
    <div id="loader"><span v-show="this.user.loading ===true" class="loader"></span></div>
    <div id="error"> <span v-show="this.user.error" >{{ this.user.error }}...</span></div>

  </div>
</template>

<script>
import { userStore } from '~/store/user';
export default {
  middleware: 'auth',
  name: 'loginPage',
  data() {
    return {
      username: 'bouguedraaymen@gmail.com',
      Password: 'Aymen069420boug!',
    }
  },
  computed: {
    user() {
      return userStore()
    },
  },
  methods: {
    initLogin() {
      this.user.login(this.username, this.Password)
    },
  },
}

</script>
<style>

:root {
    --blue:#256bec;
    --red:#d82020f5;
}
html {
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  font-family: sans-serif;
}

h1 {
  margin: 60px auto 2px auto;
  font-size: 34px;
}

p {
  font-size: 22px;
  opacity: 0.8;
}

.login {
  text-align: center;
  border-radius: 10px;
  width: 700px;
  height: 600px;
  margin: 7.5% auto auto auto;
  display: flex;
  background-color: white;
  flex-direction: column;
  box-shadow: 0px 5px 14px 0px rgba(173, 173, 173, 1);
}

input {
  width: 85%;
  height: 11%;
  margin: 0px auto 0px auto;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 22px;
  padding: 0 18px;
  transition: all .4s;
}

input:focus {
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.35);

}

label {
  margin: auto auto 10px 40px;
  font-size: larger;
}

#signIn {
  margin: auto;
  background-color: var(--blue);
  border-radius: 10px;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  outline: none;
  text-align: center;
  transform: translate3d(0, 0, 0);
  transition: all .2s;
  width: 90%;
  height: 10%;
  font-size: 30px;
}

#signIn:hover {
  background-color: #1366d6;
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

#signIn:hover:after {
  opacity: .5;
}

#signIn:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}

#signIn:active:after {
  opacity: 1;
}

#loader {
  margin: 38px auto auto auto;
  width: 400px;
  height: 50px;
  text-align: center;
}

.loader {
  width: 30px;
  height: 30px;
  border: 5px solid #1366d6;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
#error {
  text-align: center;
  font-size:28px;
  color:var(--red);
}
</style>
