import Vue from "vue";
import Vuex from "vuex";
import { productsApi } from "./lib/apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: { type: Object, default: () => {} },
    currentSubCategory: { type: Object, default: () => {} },
    currentCategory: { type: Object, default: () => {} },
    products: { type: Object, default: () => {} },
    pagination: { type: Object, default: () => {} },
    currentProduct: { type: Object, default: () => {} },
    newProducts: { type: Object, default: () => {} },
    discountProducts: { type: Object, default: () => {} }
  },
  getters: {
    getCategories: state => state.categories,
    currentSubCategory: state => state.currentSubCategory,
    currentCategory: state => state.currentCategory,
    products: state => state.products,
    pagination: state => state.pagination,
    currentProduct: state => state.currentProduct,
    newProducts: state => state.newProducts,
    discountProducts: state => state.discountProducts
  },
  mutations: {
    setCategories(state, response) {
      state.categories = response.data;
    },
    setCurrentSubCategory(state, response) {
      state.currentSubCategory = response.data;
    },
    setCurrentCategory(state, response) {
      state.currentCategory = response.data;
    },
    setProducts(state, response) {
      state.products = response.data["hydra:member"];
      state.pagination = {
        next: response.data["hydra:view"]["hydra:next"]
          ? parseInt(getUrlVars(response.data["hydra:view"]["hydra:next"]).page)
          : null,
        previous: response.data["hydra:view"]["hydra:previous"]
          ? parseInt(getUrlVars(response.data["hydra:view"]["hydra:previous"]).page)
          : null,
        max: response.data["hydra:view"]["hydra:last"]
          ? parseInt(getUrlVars(response.data["hydra:view"]["hydra:last"]).page)
          : null,
        current: response.data["hydra:view"]["@id"]
          ? parseInt(getUrlVars(response.data["hydra:view"]["@id"]).page)
          : null
      };
    },
    setCurrentProduct(state, response) {
      state.currentProduct = response.data;
    },
    setNewProducts(state, response) {
      state.newProducts = response.data;
    },
    setDiscountedProducts(state, response) {
      state.discountProducts = response.data;
    }
  },
  actions: {
    async getCategories({ commit }) {
      try {
        commit("setCategories", await productsApi.get("/categories"));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchSubCategory({ commit }, { category, subCategory, page, all }) {
      try {
        commit(
          "setCurrentSubCategory",
          await productsApi.get(`/sub_categories/${getIdFromSlug(subCategory)}`)
        );
        commit(
          "setCurrentCategory",
          await productsApi.get(`/categories/${getIdFromSlug(category)}`)
        );
        commit(
          "setProducts",
          await productsApi.get(
            `/products?page=${page || 1}&subcategory=${subCategory}&all=${all || false}`
          )
        );
      } catch (e) {
        console.error(e);
      }
    },
    async fetchCategory({ commit }, { category, page, all }) {
      try {
        commit(
          "setCurrentCategory",
          await productsApi.get(`/categories/${getIdFromSlug(category)}`)
        );
        commit(
          "setProducts",
          await productsApi.get(
            `/products?page=${page || 1}&category=${category}&all=${all || false}`
          )
        );
      } catch (e) {
        console.error(e);
      }
    },
    async fetchCurrentProduct({ commit }, { product }) {
      try {
        commit("setCurrentProduct", await productsApi.get(`/products/${getIdFromSlug(product)}`));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchNewProducts({ commit }) {
      try {
        commit("setNewProducts", await productsApi.get("/products/news"));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchDiscountedProducts({ commit }) {
      try {
        commit("setDiscountedProducts", await productsApi.get("/products/discount"));
      } catch (e) {
        console.error(e);
      }
    }
  }
});

function getIdFromSlug(slug) {
  const subCategory = slug.split("-");
  return subCategory[subCategory.length - 1];
}

function getUrlVars(url) {
  const vars = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}
