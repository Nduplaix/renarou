<template>
  <div>
    <p class="price" v-if="discount && discount !== 0">
      <span class="old-price">{{ price | toCurrency }}</span>
      <span class="new-price">{{ discountedPrice | toCurrency }}</span>
    </p>
    <p class="price" v-else>{{ price | toCurrency }}</p>
  </div>
</template>
<script>
export default {
  props: {
    discount: { required: true },
    price: { required: true }
  },
  computed: {
    discountedPrice() {
      return this.price - (this.discount * this.price) / 100;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.old-price {
  text-decoration: line-through;
}
.new-price {
  color: $wd-primary;
  margin-left: 5px;
}
</style>
