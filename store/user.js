import { defineStore } from 'pinia';
export const userStore = defineStore('user', {

  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    userFullName() {
      return this.user.firstname + ' ' + this.user.lastname
    }
  },

  actions: {
    setToken(token) {
      const axios = this.$nuxt.$axios;

      this.token = token;
      window.localStorage.setItem('evercam_token', token);
      axios.setToken(token, 'Bearer');
      //   * Set on axios instance using this.$axios.setToken(token, 'Bearer');
    },
    setUser(userData) {
      this.user = userData;
    },
    clearAuth() {
      const axios = this.$nuxt.$axios;
      this.token = null
      window.localStorage.removeItem('evercam_token');
      axios.setToken(false);
      //   * Remove from axios using this.$axios.setToken(false);
      this.user = null;
    },

    initToken(storedToken) {
      if (storedToken) {
        this.setToken(storedToken)
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
        window.location.reload()

      }
      catch (error) {
        console.error(error.response ? error.response.data : error.message);
        this.error = error;
        this.loading = false;
      }
    }
  }
})