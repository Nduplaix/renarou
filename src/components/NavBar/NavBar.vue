<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
              :to="{ name: 'subcategories', params: {subCategory: subCategory.slug}}"
            >
              {{ subCategory.label }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCategories"])
  },
};
</script>
