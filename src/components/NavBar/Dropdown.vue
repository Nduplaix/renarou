<template>
  <div>
    <span class="nav-link dropdown-toggle" @click="changeMenuStatus">
      {{ label }}
    </span>
    <div class="dropdown-menu" v-if="isOpen">
      <router-link
        :to="{ name: 'subcategories', params: { subcategory: subcategory.slug } }"
        class="dropdown-item"
        v-for="(subcategory, index) in subCategories"
        :key="index"
      >
        {{ subcategory.label }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    subCategories: { type: Array }
  },
  methods: {
    changeMenuStatus() {
      this.isOpen = !this.isOpen;
    }
  },
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style lang="scss" scoped>
.nav-link {
  cursor: pointer;
}
.dropdown-menu {
  display: block;
}
</style>
