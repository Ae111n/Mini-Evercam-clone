import { defineStore } from 'pinia';
export const userStore = defineStore('user', {

  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null,
    loginDate: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    userFullName() {
      return this.user
    }
  },

  actions: {
    setToken(token) {
      this.token = token;
      window.localStorage.setItem('evercam_token', token);
    },
    setUser(userData) {
      this.user = userData;
      window.localStorage.setItem('user_fullName',
        `${userData.firstname} ${userData.lastname}`);
      window.localStorage.setItem('lastLogin', new Date())
    },
    clearAuth() {
      const axios = this.$nuxt.$axios;
      axios.setToken(false);
      localStorage.clear()
      window.location.reload()
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
        this.setToken(data.token);
        this.setUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        });
        this.loading = false;
        if (this.error) {
          this.error = null;
        }
      }
      catch (error) {
        console.error(error.response.data);
        this.error = error.response.data.message;
        this.loading = false;
      }
    }
  }
})