<template>
  <ul class="navbar-nav" :class="isMobile() ? 'w-100' : 'mr-auto'">
    <li class="nav-item" v-if="isMobile()">
      <a type="button" class="nav-link nav-link--mobile" @click="homePush">Accueil</a>
    </li>
    <li class="nav-item dropdown" v-for="(category, index) in getCategories" :key="index">
      <a
        class="nav-link nav-link--mobile dropdown-toggle"
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
        <button
          class="dropdown-item"
          v-for="(subCategory, indexSub) in category.subCategories"
          :key="indexSub"
          @click="subCategoryPush(category, subCategory)"
        >
          {{ subCategory.label }}
        </button>
        <hr />
        <button class="dropdown-item" @click="categoryPush(category)">
          Tout
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    getCategories: { required: true }
  },
  methods: {
    subCategoryPush(category, subCategory) {
      this.closeMenu();
      this.$router.push({
        name: "subcategories",
        params: {
          category: category.slug,
          subCategory: subCategory.slug
        }
      });
    },
    categoryPush(category) {
      this.closeMenu();
      this.$router.push({
        name: "categories",
        params: {
          category: category.slug
        }
      });
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    homePush() {
      this.$emit("closeMenu");
      this.$router.push({ path: "/" });
    }
  }
};
</script>
