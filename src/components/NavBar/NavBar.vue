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

    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
      :class="{
        'collapse-mobile d-flex flex-column justify-content-between align-center': isMobile()
      }"
      v-if="displayMenu"
    >
      <nav-bar-menu
        :get-categories="getCategories"
        @closeMenu="closeMenu"
        v-if="displaySelectionMenu"
      />
      <mobile-nav-bar-profile
        :get-user-logged="getUserLogged"
        @showRegister="showRegister"
        @showLogin="showLogin"
        @logout="logoutAction"
        @closeMenu="closeMenu"
        v-if="isMobile() && !displaySelectionMenu"
      />
      <div class="w-100" v-if="isMobile()">
        <mobile-nav-bar-profile-menu @selectionMenu="updateMenu" />
      </div>
      <div v-else>
        <nav-bar-profile-menu
          :get-user-logged="getUserLogged"
          :current-user="currentUser"
          @showRegister="$emit('showRegister', true)"
          @showLogin="$emit('showLogin', true)"
          @logout="logoutAction"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import NavBarMenu from "./NavBarMenu";
import NavBarProfileMenu from "./NavBarProfileMenu";
import MobileNavBarProfileMenu from "./MobileNavBarProfileMenu";
import MobileNavBarProfile from "./MobileNavBarProfile";

export default {
  components: {
    NavBarMenu,
    NavBarProfileMenu,
    MobileNavBarProfileMenu,
    MobileNavBarProfile
  },
  computed: {
    ...mapGetters(["getCategories"]),
    ...mapGetters("user", ["currentUser", "getUserLogged"])
  },
  data() {
    return {
      displayMenu: !this.isMobile(),
      displaySelectionMenu: true
    };
  },
  methods: {
    ...mapMutations("user", ["logout"]),
    async logoutAction() {
      await this.logout();

      if (this.isMobile()) {
        this.displayMenu = false;
      }

      if (this.$route.matched[0].name === "profile") {
        this.$router.push({ name: "home" });
      }
    },

    changeDisplayMenu() {
      if (this.isMobile()) {
        this.displayMenu = !this.displayMenu;
      }
    },
    closeMenu() {
      if (this.isMobile()) {
        this.displayMenu = false;
      }
    },
    updateMenu(show) {
      this.displaySelectionMenu = show;
    },
    showRegister() {
      this.displayMenu = false;
      this.$emit("showRegister", true);
    },
    showLogin() {
      this.displayMenu = false;
      this.$emit("showLogin", true);
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

  .collapse-mobile {
    height: calc(101vh - #{$wd-navbar-height});
  }

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
