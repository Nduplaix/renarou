import Vue from "vue";
import Vuex from "vuex";
import { productsApi } from "./lib/apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: { type: Object, default: () => {} }
  },
  getters: {
    getCategories: state => state.categories
  },
  mutations: {
    setCategories(state, response) {
      console.log(response.data);
      state.categories = response.data;
    }
  },
  actions: {
    async getCategories({ commit }) {
      try {
        commit("setCategories", await productsApi.get("/categories"));
      } catch (e) {
        console.error(e);
      }
    }
  }
});
