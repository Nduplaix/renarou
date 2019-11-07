import store from "../store";
import { ProductsApi } from "./apis";

async function handleRouteChange(to, from, next) {
  await store.dispatch("getCategories");
  next();
}

/* eslint-disable no-unused-vars */
function authGuard() {
  if (store.getters.getUserLogged) {
    ordersApi.defaults.headers = {
      ...ordersApi.defaults.headers,
      authorization: `Bearer ${store.getters.currentUser.token}`,
    };
  }
}

function routerGuard(to, from, next) {
  //authGuard();
  handleRouteChange(to, from, next);
}

export { routerGuard as beforeRouteUpdate, routerGuard as beforeRouteEnter };
