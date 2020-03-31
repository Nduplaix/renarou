import { beforeRouteEnter, beforeRouteUpdate } from "./lib/routerGuards";
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import List from "./views/List";
import Product from "./views/Product";
import Cart from "./views/Cart";
import {
  Addresses,
  CommandeList,
  EditPassword,
  EditProfile,
  Profile,
  UserProfile
} from "./views/UserProfile";
import Error404 from "./views/Error404";
import CommandConfirm from "./views/CommandConfirm";
import Command from "./views/Command";
import EmailActivation from "./views/EmailActivation";
import ResetPassword from "./views/ResetPassword";

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
          path: "adresses",
          name: "my-addresses",
          component: Addresses
        },
        {
          path: "commandes",
          name: "commandes",
          component: CommandeList
        },
        {
          path: "commande/:id",
          name: "commandShow",
          component: Command
        }
      ]
    },
    {
      path: "/panier",
      name: "cart",
      component: Cart
    },
    {
      path: "/validation-commande",
      name: "command-validation",
      component: CommandConfirm
    },
    {
      path: "/404",
      name: "404",
      component: Error404
    },
    {
      path: "/activation",
      name: "email-activation",
      component: EmailActivation
    },
    {
      path: "/mot-de-passe",
      name: "reset-password",
      component: ResetPassword
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
