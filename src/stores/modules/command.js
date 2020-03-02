import { productsApi, stripeApi } from "../../lib/apis";
import qs from "querystring";

const state = {
  deliveryModes: {},
  paymentIntent: {},
  customer: {}
};

const getters = {
  deliveryModes: state => state.deliveryModes,
  paymentIntent: state => state.paymentIntent
};

const mutations = {
  setDeliveryModes(state, response) {
    state.deliveryModes = response.data;
  },
  setPaymentIntent(state, response) {
    state.paymentIntent = response.data;
  },
};

const actions = {
  async fetchDeliveryModes({ commit }) {
    commit("setDeliveryModes", await productsApi.get("/deliveries?isActive=true"));
  },
  createPayment: async function({ commit }, { amount, user }) {
    try {
      const intent = await stripeApi.post(
        "/payment_intents",
        qs.stringify({
          amount: amount * 100,
          currency: "eur",
          description: `Commande pour ${user.firstName} ${user.lastName} (${user.email})`
        })
      );

      commit("setPaymentIntent", intent);
    } catch (e) {
      console.error(e);
    }
  },
  async createCommand({ dispatch }, { deliveryId, addressId }) {
    const command = await productsApi.post("/create-commande", {
      delivery: `/api/deliveries/${deliveryId}`,
      address: `/api/addresses/${addressId}`
    });

    dispatch("user/fetchCurrentUser", null, { root: true });

    return command.data;
  },
  async updateCommand({ dispatch }, { id }) {
    await productsApi.patch(`/commandes/${id}`, {
      status: "/api/commande_statuses/2"
    });

    dispatch("user/fetchCurrentUser", null, { root: true });
  }
};

export default { namespaced: true, actions, state, mutations, getters };