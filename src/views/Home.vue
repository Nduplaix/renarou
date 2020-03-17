<template>
  <div class="container mt-5">
    <h1 class="text-center">Bienvenue sur Renarou</h1>
    <images-carousel />
    <product-banner
      class="mt-3"
      title="Nouveautés"
      v-if="newProducts.length > 0"
      :products="newProducts"
    />
    <product-banner
      class="mt-3"
      title="Articles en promo"
      v-if="discountProducts.length > 0"
      :products="discountProducts"
    />
  </div>
</template>

<script>
import { ImagesCarousel, ProductBanner } from "../components/Banner";
import { mapGetters } from "vuex";

export default {
  components: {
    ImagesCarousel,
    ProductBanner
  },
  computed: {
    ...mapGetters(["newProducts", "discountProducts"])
  }
};
</script>
