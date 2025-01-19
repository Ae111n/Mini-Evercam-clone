import { defineStore } from 'pinia';
export const userStore = defineStore('user', {

  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null,
    loginDate:null,
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
        const newDate = new Date();
        this.loginDate = newDate
        window.localStorage.setItem('lastLogin', this.loginDate)
    },
    clearAuth() {
      const axios = this.$nuxt.$axios;
      this.token = null
      window.localStorage.removeItem('evercam_token');
      axios.setToken(false);
      this.user = null;
        window.localStorage.removeItem('lastLogin', this.loginDate)
        window.localStorage.removeItem('user_fullName');
      window.location.reload()
      this.loginDate=null
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
        this.error = null;
        window.location.reload()
      }
      catch (error) {
        console.error(error.response.data);
        this.error = error.response.data.message;
        this.loading = false;
      }
    }
  }
})