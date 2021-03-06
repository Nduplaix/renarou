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
    isNewProduct(createdAt) {
      let today = new Date();
      let lastWeek = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
      let newCreatedAt = new Date(createdAt);
      return newCreatedAt > lastWeek;
    },
    isMobile() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    userLinks() {
      return [
        { name: "user-profile", label: "Mon profil" },
        { name: "edit-profile", label: "Modifier mon profil" },
        { name: "edit-password", label: "Modifier mon mot de passe" },
        { name: "my-addresses", label: "Gérer mes adresses" },
        { name: "commandes", label: "Mes commandes" }
      ];
    }
  }
});

Vue.filter("formatDate", function(date) {
  let newDate = new Date(date);
  let dd = newDate.getDate();
  let mm = newDate.getMonth() + 1;

  let yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
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
