import { productsApi } from "../../lib/apis";

const state = {
  deliveryModes: {}
};

const getters = {
  deliveryModes: state => state.deliveryModes
};

const mutations = {
  setDeliveryModes(state, response) {
    state.deliveryModes = response.data;
  }
};

const actions = {
  async fetchDeliveryModes({ commit }) {
    commit("setDeliveryModes", await productsApi.get("/deliveries?isActive=true"));
  }
};

export default { namespaced: true, actions, state, mutations, getters };
