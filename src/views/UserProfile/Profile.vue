<template>
  <div class="profile">
    <aside v-if="!isMobile()">
      <div class="list-group mt-3">
        <router-link
          class="list-group-item list-group-item-action"
          v-for="(link, index) in links"
          :key="index"
          :to="{ name: link.name }"
          :class="{ active: link.name === $route.name }"
        >
          {{ link.label }}
        </router-link>
      </div>
    </aside>
    <div class="profile__content" :class="{ 'profile__content--mobile container': isMobile() }">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  mounted() {
    if (!localStorage.getItem("currentToken")) {
      this.$router.push({ name: "404" });
    }
  },
  data() {
    return {
      links: [
        { name: "user-profile", label: "Mon profil" },
        { name: "edit-profile", label: "Modifier mon profil" },
        { name: "edit-password", label: "Modifier mon mot de passe" },
        { name: "commandes", label: "Mes commandes" }
      ]
    };
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
    padding: $wd-padding-3;
    display: flex;
    align-items: center;
    &--mobile {
      margin-left: 0;
    }
  }
}
</style>
