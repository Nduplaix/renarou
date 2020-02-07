<template>
  <div class="product-banner">
    <h1 class="text-center text-uppercase">{{ title }}</h1>
    <div class="row banner-list p-3 mt-3 justify-content-center">
      <card
        v-for="(product, index) in products"
        :key="index"
        :label="product.label"
        :image="product.images[0]"
        :price="product.price"
        :discount="product.discount"
        :isSmall="true"
        :createdAt="product.createdAt"
        :slug="product.slug"
      />
    </div>
  </div>
</template>

<script>
import { Card } from "../ProductCard";

export default {
  components: { Card },
  props: {
    title: { required: true, type: String },
    products: { required: true, type: Array }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

h1 {
  font-weight: 700;
  font-size: 2rem;
}
.banner-list {
  border-radius: $wd-border-radius-medium;
}
</style>
