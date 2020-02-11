import { productsApi, setJwt } from "../../lib/apis";

function parseToken(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

const state = {
  userLogged: false,
  currentUser: {}
};

const getters = {
  currentUser: st => st.currentUser,
  getUserLogged: st => st.userLogged,
  username: ({ currentUser }) => currentUser.firstName + " " + currentUser.lastName
};

const mutations = {
  setUser(state, token) {
    state.userLogged = true;
    const payload = parseToken(token);
    localStorage.setItem("currentUser", token);
    setJwt(token);
    state.currentUser = payload;
  },

  logout(state) {
    state.currentUser = {};
    state.userLogged = false;
    localStorage.removeItem("currentUser");
  }
};

const actions = {
  async getAuthToken({ commit }, { username, password }) {
    const response = await productsApi.post("/login_check", {
      username,
      password
    });
    commit("setUser", response.data.token);
  },

  setStorageToken({ commit }) {
    const token = localStorage.getItem("currentUser");
    if (token) {
      commit("setUser", token);
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

  async createAddress({ getters }, { number, streetType, street, city, postalCode }) {
    await productsApi.post("/addresses", {
      number,
      streetType,
      street,
      city,
      postalCode,
      user: `/api/users/${getters.currentUser.id}`
    });
  }
};

export default { namespaced: true, actions, state, mutations, getters };
