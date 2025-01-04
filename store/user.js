import { defineStore } from 'pinia';
export const userStore = defineStore('user', {

  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated() {
      if (this.token || window.localStorage.getItem('evercam_token')) {
        return true;

      } else {
        return false;
      }
    },

    userFullName() {
      /*  combines firstname and lastname */
    }
  },

  actions: {

    setToken(token) {
      this.token = token;
      window.localStorage.setItem('evercam_token', token);
      //   * Set on axios instance using this.$axios.setToken(token, 'Bearer')
    },
    setUser(userData) {
      this.user = userData;
    },
    clearAuth() {
      this.token = null
      window.localStorage.removeItem('evercam_token');
      //   * Remove from axios using this.$axios.setToken(false);
      this.user = null;
    },

    initToken() {
      const storedToken = localStorage.getItem('evercam_token')
      if (storedToken) {
        this.setToken(storedToken)
      } 
      else {
        return
      }
    },

    async login(username, password) {
      const axios = this.$nuxt.$axios;
      this.loading = true;

      try {
        const response = await axios.post('/auth/login', {
          'username': username,
          'password': password
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await response.data;
        console.log(data);
        this.setUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        });
        this.setToken(data.token);
        this.loading = false;
      }

      catch (error) {
        console.error(error.response ? error.response.data : error.message);
        this.error = error;
        this.loading = false;
      }
    }
  }
})