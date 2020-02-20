<template>
  <tr>
    <td class="label">{{ line.reference.product.label }}</td>
    <td>
      <img
        :src="line.reference.product.images[0].link"
        :alt="line.reference.product.images[0].alt"
      />
    </td>
    <td>{{ line.reference.product.price|toCurrency }}</td>
    <td class="d-flex justify-content-center">
      <input-number
        input-id="quantity"
        :input-value="line.quantity"
        :input-max="maxQuantity"
        :input-min="minQuantity"
        @updateValue="updateQuantity"
      />
    </td>
    <td>{{ line.reference.product.discount ? `${line.reference.product.discount} %` : "aucune" }}</td>
    <td>{{ line.totalPrice|toCurrency }}</td>
    <td>
      <button type="button" class="btn btn-danger" @click="deleteLine">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { InputNumber } from "../Inputs";
import { mapActions } from "vuex";

export default {
  components: {
    InputNumber
  },
  props: {
    line: { required: true }
  },
  data() {
    return {
      maxQuantity: this.line.reference.stock,
      minQuantity: 1
    };
  },
  methods: {
    ...mapActions("user", ["updateLineCartQuantity", "deleteCartLine"]),
    updateQuantity(quantity) {
      try {
        this.updateLineCartQuantity({ id: this.line.id, quantity: parseInt(quantity) });
      } catch (e) {
        this.$emit("error", e);
      }
    },
    deleteLine() {
      try {
        this.deleteCartLine({ id: this.line.id });
      } catch (e) {
        this.$emit("error", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  img {
    max-width: 100px;
    max-height: 225px;
  }
}

.label {
  max-width: 150px;
}
</style>
