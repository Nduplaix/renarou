<template>
  <div class="container">
    <h1 class="text-center">Bienvenue sur Renarou</h1>
    <banner class="mt-5" image-link="/Banners/banniere-nature.jpg" image-alt="Bannière" />
    <product-banner class="mt-3" title="Nouveautés" :products="newProducts" />
    <product-banner class="mt-3" title="Articles en promo" :products="discountProducts" />
  </div>
</template>

<script>
import { Banner, ProductBanner } from "../components/Banner";
import { mapGetters } from "vuex";

export default {
  components: {
    Banner,
    ProductBanner
  },
  computed: {
    ...mapGetters(["newProducts", "discountProducts"])
  }
};
</script>
