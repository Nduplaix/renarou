import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import "bootstrap";
import VueScrollTo from "vue-scrollto";

import "./assets/scss/app.scss";

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    isNewProduct: function (createdAt) {
      let today = new Date();
      let lastWeek = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
      let newCreatedAt = new Date(createdAt);
      return newCreatedAt > lastWeek;
    }
  }
});

Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
