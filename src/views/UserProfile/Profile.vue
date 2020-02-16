<template>
  <div class="profile">
    <aside v-if="!isMobile()">
      <div class="list-group mt-5">
        <router-link
          class="list-group-item list-group-item-action"
          v-for="(link, index) in userLinks()"
          :key="index"
          :to="{ name: link.name }"
          :class="{ active: link.name === $route.name }"
        >
          {{ link.label }}
        </router-link>
      </div>
    </aside>
    <div class="profile__content mt-5" :class="{ 'profile__content--mobile container': isMobile() }">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["getUserLogged"])
  },
  mounted() {
    if (!localStorage.getItem("currentToken") && !this.getUserLogged) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.profile {
  position: relative;
  aside {
    position: fixed;
    top: $wd-navbar-height;
    left: 0;
    width: $wd-aside-width;
  }
  &__content {
    margin-left: $wd-aside-width;
    padding: 0 $wd-padding-3;
    display: flex;
    align-items: center;
    justify-content: center;
    &--mobile {
      margin-left: 0;
    }
  }
}
</style>
