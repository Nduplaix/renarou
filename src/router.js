import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import List from "./views/List";
import Product from "./views/Product";

import { beforeRouteEnter, beforeRouteUpdate } from "./lib/routerGuards";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: {
        ...Home,

        beforeRouteUpdate,
        beforeRouteEnter
      }
    },
    {
      path: "/porduits/:category/:subCategory",
      name: "subcategories",
      component: {
        ...List,

        beforeRouteUpdate,
        beforeRouteEnter
      }
    },
    {
      path: "/produits/:category",
      name: "categories",
      component: {
        ...List,

        beforeRouteUpdate,
        beforeRouteEnter
      }
    },
    {
      path: "/produit/:product",
      name: "product",
      component: {
        ...Product,

        beforeRouteUpdate,
        beforeRouteEnter
      }
    }
  ]
});
