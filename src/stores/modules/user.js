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
  setToken(state, token) {
    state.userLogged = true;
    const payload = parseToken(token);
    localStorage.setItem("currentToken", token);
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
  async getAuthToken({ commit, dispatch }, { username, password }) {
    const response = await productsApi.post("/login_check", {
      username,
      password
    });
    commit("setToken", response.data.token);
    dispatch("fetchCurrentUser");
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
      commit("setToken", token);
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

  async updateUser({commit}, {id, email, firstName, lastName}) {
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

  async createAddress({ getters, dispatch }, { number, streetType, street, city, postalCode }) {
    await productsApi.post("/addresses", {
      number,
      streetType,
      street,
      city,
      postalCode,
      user: `/api/users/${getters.currentUser.id}`
    });

    dispatch("fetchCurrentUser");
  },

  async editAddress({ dispatch }, { id, number, streetType, street, city, postalCode }) {
    await productsApi.patch(`/addresses/${id}`, {
      number,
      streetType,
      street,
      city,
      postalCode
    });

    dispatch("fetchCurrentUser");
  },

  async removeAddress({ dispatch }, { id }) {
    await productsApi.delete(`/addresses/${id}`);

    dispatch("fetchCurrentUser");
  }
};

export default { namespaced: true, actions, state, mutations, getters };
