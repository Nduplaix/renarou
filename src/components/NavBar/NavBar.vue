<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" @click="changeMenuStatus">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown" v-if="isMenuOpen">
      <ul class="navbar-nav">
        <li class="nav-item dropdown" v-for="(category, index) in getCategories" :key="index">
          <Dropdown :label="category.label" :subCategories="category.subCategories" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import Dropdown from "./Dropdown";

export default {
  components: {
    Dropdown
  },
  computed: {
    ...mapGetters(["getCategories"])
  },
  data() {
    return {
      isMenuOpen: !this.isMobile()
    };
  },
  methods: {
    changeMenuStatus() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  }
};
</script>
