import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import List from "./views/List";
import Product from "./views/Product";

import { beforeRouteEnter, beforeRouteUpdate } from "./lib/routerGuards";
import UserProfile from "./views/UserProfile/UserProfile";
import Profile from "./views/UserProfile/Profile";
import Error404 from "./views/Error404";
import EditProfile from "./views/UserProfile/EditProfile";
import EditPassword from "./views/UserProfile/EditPassword";

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
    },
    {
      path: "/mon-profil",
      name: "profile",
      component: {
        ...Profile,

        beforeRouteUpdate,
        beforeRouteEnter
      },
      children: [
        {
          path: "/",
          name: "user-profile",
          component: {
            ...UserProfile,

            beforeRouteUpdate,
            beforeRouteEnter
          }
        },
        {
          path: "modifier",
          name: "edit-profile",
          component: EditProfile
        },
        {
          path: "modifier-mot-de-passe",
          name: "edit-password",
          component: EditPassword
        },
        {
          path: "commandes",
          name: "commandes"
        }
      ]
    },
    {
      path: "/404",
      name: "404",
      component: Error404
    }
  ]
});
