import { productsApi, stripeApi } from "../../lib/apis";
import qs from "querystring";

const state = {
  deliveryModes: {},
  paymentIntent: {},
  customer: {},
  currentCommand: {}
};

const getters = {
  deliveryModes: state => state.deliveryModes,
  paymentIntent: state => state.paymentIntent,
  currentCommand: state => state.currentCommand
};

const mutations = {
  setDeliveryModes(state, response) {
    state.deliveryModes = response.data;
  },
  setPaymentIntent(state, response) {
    state.paymentIntent = response.data;
  },
  setCurrentCommand(state, response) {
    state.currentCommand = response.data;
  }
};

const actions = {
  async fetchDeliveryModes({ commit }) {
    commit("setDeliveryModes", await productsApi.get("/deliveries?isActive=true"));
  },
  createPayment: async function({ commit }, { amount, user }) {
    const intent = await stripeApi.post(
      "/payment_intents",
      qs.stringify({
        amount: amount * 100,
        currency: "eur",
        description: `Commande pour ${user.firstName} ${user.lastName} (${user.email})`
      })
    );

    commit("setPaymentIntent", intent);
  },
  async createCommand({ dispatch }, { deliveryId, addressId, discountId }) {
    let data = {
      delivery: `/api/deliveries/${deliveryId}`,
      address: `/api/addresses/${addressId}`
    };

    if (null !== discountId) {
      data.discountCode = `/api/discount_codes/${discountId}`;
    }

    const command = await productsApi.post("/create-commande", data);

    dispatch("user/fetchCurrentUser", null, { root: true });

    return command.data;
  },
  async updateCommand({ dispatch }, { id }) {
    await productsApi.patch(`/commandes/${id}`, {
      status: "/api/commande_statuses/2"
    });

    dispatch("user/fetchCurrentUser", null, { root: true });
  },
  async fetchCurrentCommand({ commit }, { id }) {
    commit("setCurrentCommand", await productsApi.get(`/commandes/${id}`));
  }
};

export default { namespaced: true, actions, state, mutations, getters };
