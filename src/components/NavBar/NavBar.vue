<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'home' }">Renarou</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="changeDisplayMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="displayMenu">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown" v-for="(category, index) in getCategories" :key="index">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            :id="`navbarDropdown-${index}`"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ category.label }}
          </a>
          <div class="dropdown-menu" :aria-labelledby="`navbarDropdown-${index}`">
            <router-link
              class="dropdown-item"
              v-for="(subCategory, indexSub) in category.subCategories"
              :key="indexSub"
              :to="{
                name: 'subcategories',
                params: {
                  category: category.slug,
                  subCategory: subCategory.slug
                }
              }"
            >
              {{ subCategory.label }}
            </router-link>
            <hr />
            <router-link
              class="dropdown-item"
              :to="{
                name: 'categories',
                params: {
                  category: category.slug
                }
              }"
            >
              Tout
            </router-link>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav mr-0" v-if="!getUserLogged">
        <li class="nav-item">
          <button type="button" class="btn btn-outline-primary" @click="$emit('showLogin', true)">
            Login
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="$emit('showRegister', true)"
          >
            Register
          </button>
        </li>
      </ul>
      <ul class="navbar-nav mr-0" v-else>
        <li class="nav-item cart">
          <router-link class="nav-link" :to="{ name: 'cart' }">
            <i class="fas fa-shopping-cart cart__icon"></i>
          </router-link>
          <div class="cart__count" v-if="currentUser.basket">{{ cartCount() }}</div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown-user"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Mon compte
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdown-user"
            v-if="isMobile()"
          >
            <router-link
              class="dropdown-item"
              v-for="(link, index) in userLinks()"
              :key="index"
              :to="{ name: link.name }"
            >
              {{ link.label }}
            </router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" type="button" @click="logoutAction">
              Deconnexion
            </a>
          </div>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user" v-else>
            <router-link class="dropdown-item" :to="{ name: 'user-profile' }">
              Mon profile
            </router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" type="button" @click="logoutAction">
              Deconnexion
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCategories"]),
    ...mapGetters("user", ["currentUser", "getUserLogged"])
  },
  data() {
    return {
      displayMenu: !this.isMobile()
    };
  },
  methods: {
    ...mapMutations("user", ["logout"]),
    async logoutAction() {
      await this.logout();

      if (this.$route.matched[0].name === "profile") {
        this.$router.push({ name: "home" });
      }
    },

    changeDisplayMenu() {
      this.displayMenu = !this.displayMenu;
    },
    cartCount() {
      let count = 0;
      this.currentUser.basket.basketLines.forEach(function(line) {
        count += line.quantity;
      });

      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.11);
  min-height: $wd-navbar-height;

  .cart {
    position: relative;
    width: 3rem;
    &__icon {
      font-size: 2rem;
    }
    &__count {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 20px;
      background-color: $wd-primary;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $wd-white;
      font-size: $wd-font-size-sm;
    }
  }
}
</style>
