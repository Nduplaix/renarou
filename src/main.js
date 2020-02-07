import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import "bootstrap";
import VueScrollTo from "vue-scrollto";

import "./assets/scss/app.scss";

Vue.config.productionTip = false;

Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
