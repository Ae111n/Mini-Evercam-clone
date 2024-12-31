import { defineStore } from 'pinia';
export const userStore = defineStore('user', {

  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null
  }),
  getters: {

  },

  actions: {

  }

})