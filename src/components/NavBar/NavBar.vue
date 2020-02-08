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
      @click="displayMenu = !displayMenu"
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
          <button type="button" class="btn btn-outline-primary" @click="$emit('showLogin', true)">Login</button>
        </li>
      </ul>
      <ul class="navbar-nav mr-0" v-else>
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
            {{ currentUser.username }}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
            <a class="dropdown-item" href="#" type="button" @click="logout">
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
    isMobile() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    changeDisplayMenu() {
      this.displayMenu = !this.displayMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.11);
}
</style>
