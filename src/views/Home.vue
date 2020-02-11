<template>
  <div class="container">
    <h1 class="text-center">Bienvenue sur Renarou</h1>
    <images-carousel/>
    <product-banner class="mt-3" title="Nouveautés" :products="newProducts" />
    <product-banner class="mt-3" title="Articles en promo" :products="discountProducts" />
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
