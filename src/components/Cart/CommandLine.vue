<template>
  <div class="cart-line border rounded my-2">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img
          :src="line.reference.product.images[0].link"
          :alt="line.reference.product.images[0].alt"
        />
      </div>
      <div class="col-md-4">
        <div>
          <p>{{ line.reference.product.label }}</p>
        </div>
        <div><p>Prix unitaire : {{ line.reference.product.price | toCurrency }}</p></div>
      </div>
      <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
        <p>Nombre d'articles : {{ line.quantity }}</p>
        <div>
          <p>{{ line.reference.product.discount ? `Promo : - ${line.reference.product.discount} %` : "" }}</p>
        </div>
        <div class="row">
          <div class="col">Prix total : </div>
          <div v-if="line.totalPrice === line.totalWithDiscount">
            <p>{{ line.totalPrice|toCurrency }}</p>
          </div>
          <div class="col" v-else>
            <p class="old-price m-0">{{ line.totalPrice | toCurrency }}</p>
            <p class="new-price m-0">{{ line.totalWithDiscount | toCurrency }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    line: { required: true }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.cart-line {
  padding: $wd-padding-3;
  text-align: center;
}
img {
  max-width: 100px;
  max-height: 225px;
}
.col-md {
  text-align: center;
}
</style>
