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
      <div class="col-md-3 d-flex flex-column justify-content-center align-items-center">
        <input-number
          class="p-2"
          input-id="quantity"
          :input-value="line.quantity"
          :input-max="maxQuantity"
          :input-min="minQuantity"
          @updateValue="updateQuantity"
        />
        <div>
          <p>{{ line.reference.product.discount ? `Promo : -${line.reference.product.discount} %` : "" }}</p>
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
      <div class="col-md-1 mt-3 mt-md-0">
        <button type="button" class="btn btn-danger" @click="deleteLine">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { InputNumber } from "../Inputs";
import { mapActions } from "vuex";

export default {
  components: {
    InputNumber
  },
  props: {
    line: { required: true },
    userLogged: { required: true },
    index: { required: true }
  },
  data() {
    return {
      maxQuantity: this.line.reference.stock,
      minQuantity: 1
    };
  },
  methods: {
    ...mapActions("user", ["updateLineCartQuantity", "deleteCartLine"]),
    ...mapActions("cart", ["removeCartLine", "updateCartQuantity"]),
    updateQuantity(quantity) {
      try {
        if (this.userLogged) {
          this.updateLineCartQuantity({ id: this.line.id, quantity: parseInt(quantity) });
        } else {
          this.updateCartQuantity({ index: this.index, quantity });
        }
      } catch (e) {
        this.$emit("error", e);
      }
    },
    deleteLine() {
      try {
        if (this.userLogged) {
          this.deleteCartLine({ id: this.line.id });
        } else {
          this.removeCartLine(this.index);
        }
      } catch (e) {
        this.$emit("error", e);
      }
    }
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
