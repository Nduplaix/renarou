import { productsApi, setJwt } from "../../lib/apis";

function parseToken(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

const state = {
  userLogged: false,
  token: {},
  currentUser: {}
};

const getters = {
  currentUser: st => st.currentUser,
  getToken: state => state.token,
  getUserLogged: st => st.userLogged,
  username: ({ currentUser }) => currentUser.firstName + " " + currentUser.lastName
};

const mutations = {
  setToken(state, { token, stayConnect }) {
    state.userLogged = true;
    const payload = parseToken(token);

    if (stayConnect) {
      localStorage.setItem("currentToken", token);
    }

    setJwt(token);
    state.token = payload;
  },

  setUser(state, response) {
    state.currentUser = response.data;
  },

  logout(state) {
    state.currentUser = {};
    state.token = {};
    state.userLogged = false;
    localStorage.removeItem("currentToken");
  }
};

const actions = {
  async getAuthToken({ commit, dispatch }, { username, password, stayConnect }) {
    const response = await productsApi.post("/login_check", {
      username,
      password
    });
    commit("setToken", { token: response.data.token, stayConnect });

    if (localStorage.getItem("cart")) {
      await productsApi.post("/basket/merge", JSON.parse(localStorage.getItem("cart")));
    }

    localStorage.removeItem("cart");
    await dispatch("fetchCurrentUser");
  },

  async fetchCurrentUser({ commit, getters }) {
    try {
      commit("setUser", await productsApi.get(`/users/${getters.getToken.id}`));
    } catch (e) {
      console.error(e);
    }
  },

  setStorageToken({ commit, dispatch }) {
    const token = localStorage.getItem("currentToken");
    if (token) {
      commit("setToken", { token });
      dispatch("fetchCurrentUser");
    }
  },

  async register({ dispatch }, { email, password, firstName, lastName }) {
    await productsApi.post("/create_user", {
      email: email,
      plainPassword: password,
      firstName: firstName,
      lastName: lastName
    });
    dispatch("getAuthToken", { username: email, password });
  },

  async updateUser({ commit }, { id, email, firstName, lastName }) {
    const response = await productsApi.patch(`/users/${id}`, {
      email,
      firstName,
      lastName
    });

    commit("setUser", response);
  },

  async updatePassword({ commit }, { id, plainPassword }) {
    const response = await productsApi.patch(`/users/${id}`, {
      plainPassword
    });

    commit("setUser", response);
  },

  async checkPassword({}, { id, plainPassword }) {
    await productsApi.post(`/users/${id}`, {
      plainPassword
    });
  },

  async createAddress({ getters, dispatch }, { number, streetType, street, complement, city, postalCode }) {
    await productsApi.post("/addresses", {
      number,
      streetType,
      street,
      complement,
      city,
      postalCode,
      user: `/api/users/${getters.currentUser.id}`
    });

    await dispatch("fetchCurrentUser");
  },

  async editAddress({ dispatch }, { id, number, streetType, street, complement, city, postalCode }) {
    await productsApi.patch(`/addresses/${id}`, {
      number,
      streetType,
      street,
      complement,
      city,
      postalCode
    });

    await dispatch("fetchCurrentUser");
  },

  async removeAddress({ dispatch }, { id }) {
    await productsApi.delete(`/addresses/${id}`);

    await dispatch("fetchCurrentUser");
  },

  async addLineToCart({ dispatch, getters }, { reference, quantity }) {
    const basket = getters.currentUser.basket.id;
    await productsApi.post("/basket-lines", {
      reference: `/api/references/${reference}`,
      quantity,
      basket: `/api/baskets/${basket}`
    });

    await dispatch("fetchCurrentUser");
  },

  async updateLineCartQuantity({ dispatch }, { id, quantity }) {
    await productsApi.patch(`/basket_lines/${id}`, { quantity });

    await dispatch("fetchCurrentUser");
  },

  async deleteCartLine({ dispatch }, { id }) {
    await productsApi.delete(`/basket_lines/${id}`);

    await dispatch("fetchCurrentUser");
  },

  async emailActivation({}, { token }) {
    await productsApi.post("/active-mail", { token });
  },

  async sendResetPassword({}, { email }) {
    await productsApi.post("/send-reset-password", { email });
  },

  async resetPassword({}, { token, password, confirmPassword }) {
    await productsApi.post("/reset-password", {
      token,
      password,
      confirmPassword
    });
  }
};

export default { namespaced: true, actions, state, mutations, getters };
