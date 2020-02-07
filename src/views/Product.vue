<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6  ">
        <carousel :images="currentProduct.images" />
      </div>
      <div class="col-md-6 mt-5 mt-md-0">
        <h1>{{ currentProduct.label }}</h1>
        <p><b>{{ currentProduct.price|toCurrency }}</b></p>
        <div v-html="currentProduct.description"></div>
        <hr>
        <div class="stock">
          <span class="text-success" v-if="maxQuantity > 2">Il reste {{maxQuantity}} articles en stock</span>
          <span class="text-warning" v-else-if="maxQuantity <= 2 && maxQuantity > 0">Il reste {{maxQuantity}} articles en stock</span>
          <span class="text-danger" v-else>Il ne reste plus d'articles en stock</span>
        </div>
        <div class="select-size">
          <form>
            <div class="form-group p-0 col-md-4 col-6">
              <label for="size">Taille</label>
              <select id="size" class="form-control" v-model="selectedSize">
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
                :input-value="selectedQuantity"
                :input-max="maxQuantity"
                :input-min="minQuantity"
                @updateValue="updateQuantity"
              />
            </div>

            <button
              type="submit"
              class="btn btn-outline-primary"
              :class="{ disabled: maxQuantity === 0 }"
              :disabled="maxQuantity === 0"
            >
              <i class="fas fa-cart-arrow-down"></i> Ajouter au panier
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from "../components/Carousel";
import { InputNumber } from "../components/Inputs";
import { mapGetters } from "vuex";

export default {
  components: {
    Carousel,
    InputNumber
  },
  computed: {
    ...mapGetters(["currentProduct"])
  },
  data() {
    return {
      selectedSize: null,
      selectedQuantity: 0,
      maxQuantity: 1,
      minQuantity: 0
    };
  },
  mounted() {
    this.selectedSize = this.currentProduct.tReferences[0].id;
  },
  watch: {
    selectedSize: function(newValue) {
      this.maxQuantity = this.getReferenceById(newValue).stock;
      if (this.getReferenceById(newValue).stock > 0) {
        this.selectedQuantity = 1;
        this.minQuantity = 1;
      }
    }
  },
  methods: {
    updateQuantity(value) {
      this.selectedQuantity = value;
    },
    getReferenceById(id) {
      return this.currentProduct.tReferences.find(element => element.id === id);
    }
  }
};
</script>

<style lang="scss" scoped>
.quantity-select {
  display: flex;
  justify-content: center;
}
</style>
