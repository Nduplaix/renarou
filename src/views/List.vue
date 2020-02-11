<template>
  <div class="container mt-5">
    <h1>
      {{ currentCategory.label }}
      <span v-if="$route.name === 'subcategories'"> - {{ currentSubCategory.label }}</span>
    </h1>
    <div class="alert alert-warning" v-if="products.length === 0">
      Il n'y a pas d'articles disponibles pour cette catégorie
    </div>

    <div class="container row m-0">
      <card
        v-for="(product, index) in products"
        :key="index"
        :label="product.label"
        :image="product.images[0]"
        :price="product.price"
        :discount="product.discount"
        :createdAt="product.createdAt"
        :slug="product.slug"
      />
    </div>
    <pagination
      :max="pagination.max"
      :next="pagination.next"
      :previous="pagination.previous"
      :current="pagination.current"
      :display="products.length > 20"
      @loadPage="loadProducts"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Card } from "../components/ProductCard";
import Pagination from "../components/Pagination/Pagination.vue";

export default {
  components: {
    Card,
    Pagination
  },
  computed: {
    ...mapGetters(["products", "currentSubCategory", "currentCategory", "pagination"])
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchSubCategory"]),
    loadProducts({ page, all }) {
      if (this.$route.name === "categories") {
        this.fetchCategory({ category: this.currentCategory.slug, page, all });
      } else {
        this.fetchSubCategory({
          category: this.currentCategory.slug,
          subCategory: this.currentSubCategory.slug,
          page,
          all
        });
      }
      window.scrollTo(0, 0);
    }
  }
};
</script>
