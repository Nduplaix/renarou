<template>
  <div class="input-number input-group">
    <div class="input-group-prepend">
      <button
        type="button"
        class="btn btn-outline-primary rounded-circle"
        :class="{ disabled: internalValue === inputMin }"
        :disabled="internalValue === inputMin"
        @click="removeValue"
      >
        <i class="fas fa-minus"></i>
      </button>
    </div>
    <input
      type="number"
      :id="inputId"
      class="form-control rounded-pill"
      v-model="inputValue"
      @change="updateValue"
    />
    <div class="input-group-append">
      <button
        type="button"
        class="btn btn-outline-primary rounded-circle"
        :class="{ disabled: internalValue === inputMax }"
        :disabled="internalValue === inputMax"
        @click="appendValue"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputId: { required: true, type: String },
    inputValue: { required: true, type: Number | String },
    inputMax: { required: true, type: Number | String },
    inputMin: { required: true, type: Number | String }
  },
  watch: {
    inputValue: function(newValue) {
      this.internalValue = newValue;
    }
  },
  data() {
    return {
      internalValue: 0
    };
  },
  methods: {
    updateValue() {
      if (this.internalValue > this.inputMax) {
        this.internalValue = this.inputMax;
      }

      if (this.internalValue < this.inputMin) {
        this.internalValue = this.inputMin;
      }

      this.$emit("updateValue", this.internalValue);
    },
    appendValue() {
      if (this.internalValue < this.inputMax) {
        this.internalValue++;
        this.updateValue();
      }
    },
    removeValue() {
      if (this.internalValue > this.inputMin) {
        this.internalValue--;
        this.updateValue();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-number {
  max-width: 150px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
