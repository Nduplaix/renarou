<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6  ">
        <carousel :images="currentProduct.images" />
      </div>
      <div class="col-md-6 mt-5 mt-md-0">
        <h1>{{ currentProduct.label }}</h1>
        <div class="tags tags--static mb-3">
          <new-tag v-if="isNewProduct(currentProduct.createdAt)" />
          <discount-tag v-if="currentProduct.discount && currentProduct.discount !== 0">
            - {{ currentProduct.discount }} %
          </discount-tag>
        </div>
        <product-price
          class="price"
          :discount="currentProduct.discount"
          :price="currentProduct.price"
        />
        <div v-html="currentProduct.description"></div>
        <hr>
        <div class="stock">
          <span class="text-success" v-if="maxQuantity > 2">Il reste {{maxQuantity}} articles en stock</span>
          <span class="text-warning" v-else-if="maxQuantity <= 2 && maxQuantity > 0">Il reste {{maxQuantity}} articles en stock</span>
          <span class="text-danger" v-else>Il ne reste plus d'articles en stock</span>
        </div>
        <div class="select-size">
          <form @submit.prevent="submitCart">
            <div class="alert alert-danger mt-3" v-if="formErrors.length !== 0">
              <div v-for="(message, index) in formErrors" :key="index">
                {{ message }}
              </div>
            </div>
            <div class="form-group p-0 col-md-4 col-6">
              <label for="size">Taille</label>
              <select id="size" class="form-control" v-model="reference">
                <option
                  :value="reference.id"
                  v-for="(reference, index) in currentProduct.tReferences"
                  :key="index"
                >
                  {{ reference.size.label }}
                </option>
              </select>
            </div>

            <div class="form-group p-0 col-md-4 col-6">
              <label for="quantity">Quantité</label>
              <input-number
                input-id="quantity"
                :input-value="quantity"
                :input-max="maxQuantity"
                :input-min="minQuantity"
                @updateValue="updateQuantity"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              :class="{ disabled: maxQuantity === 0 }"
              :disabled="maxQuantity === 0"
            >
              <i class="fas fa-cart-arrow-down"></i> Ajouter au panier
            </button>
          </form>
        </div>
      </div>
    </div>
    <validation-pop-up type="success" v-if="addToCartValid" @close="addToCartValid = false">
      Votre article a bien été ajouté à votre panier. Merci de votre confiance.
    </validation-pop-up>
    <validation-pop-up type="danger" v-if="addToCartError" @close="addToCartError = false">
      Une erreur est survenue. Nous nous excusons pour la gène occasionné.
    </validation-pop-up>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import { Carousel } from "../components/Carousel";
import { InputNumber } from "../components/Inputs";
import { ProductPrice } from "../components/Product";
import { NewTag, DiscountTag } from "../components/Tags";
import ValidationPopUp from "../components/PopUp/ValidationPopUp";
import { mapGetters, mapActions } from "vuex";
import Loading from "../components/Loading";

export default {
  components: {
    Carousel,
    InputNumber,
    ProductPrice,
    NewTag,
    DiscountTag,
    ValidationPopUp,
    Loading
  },
  computed: {
    ...mapGetters(["currentProduct"]),
    ...mapGetters("user", ["getUserLogged"])
  },
  data() {
    return {
      reference: null,
      quantity: 0,
      maxQuantity: 1,
      minQuantity: 0,
      formErrors: [],
      addToCartValid: false,
      addToCartError: false,
      loading: false
    };
  },
  mounted() {
    this.reference = this.currentProduct.tReferences[0].id;
  },
  watch: {
    reference: function(newValue) {
      this.maxQuantity = this.getReferenceById(newValue).stock;
      if (this.getReferenceById(newValue).stock > 0) {
        this.quantity = 1;
        this.minQuantity = 1;
      }
    }
  },
  methods: {
    ...mapActions("user", ["addLineToCart"]),
    ...mapActions("cart", ["addCartLine"]),
    updateQuantity(value) {
      this.quantity = value;
    },
    getReferenceById(id) {
      return this.currentProduct.tReferences.find(element => element.id === id);
    },
    async submitCart() {
      this.loading = true;
      try {
        const { reference, quantity } = this;
        if (!this.getUserLogged) {
          await this.addCartLine({
            reference: this.getReferenceById(this.reference),
            quantity,
            product: this.currentProduct
          });
        } else {
          await this.addLineToCart({ reference, quantity });
        }
        this.loading = false;
        this.addToCartValid = true;
      } catch (e) {
        this.loading = false;
        this.formErrors = [];
        if (e.response && e.response.data.code && e.response.data.code === 401) {
          this.formErrors.push(e.response.data.message);
        } else {
          console.error(e);
          this.addToCartError = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.quantity-select {
  display: flex;
  justify-content: center;
}
.price {
  font-weight: 700;
}
</style>
