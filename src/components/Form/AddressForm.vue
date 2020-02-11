<template>
  <div class="popin">
    <div class="popin-dialog">
      <span class="h1">Informations de livraison</span>
      <form @submit.prevent="addressSubmit">
        <div class="alert alert-danger mt-3" v-if="addressErrors.length !== 0">
          <div v-for="(message, index) in addressErrors" :key="index">
            {{ message }}
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="col-3">
            <label for="number">numéro</label>
            <input
              type="text"
              class="form-control"
              placeholder="numéro"
              v-model="number"
              id="number"
            />
          </div>
          <div class="col-3">
            <label for="streetType">type de voie</label>
            <select class="form-control" v-model="streetTypeSelected" id="streetType">
              <option v-for="(type, index) in streetType" :key="index">{{ type }}</option>
            </select>
          </div>
          <div class="col">
            <label for="street">nom de la voie</label>
            <input
              type="text"
              class="form-control"
              placeholder="voie"
              v-model="street"
              id="street"
            />
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="col-4">
            <label for="postalCode">Code postal</label>
            <input
              type="text"
              placeholder="code postal"
              id="postalCode"
              class="form-control"
              v-model="postalCode"
            />
          </div>
          <div class="col">
            <label for="city">Code postal</label>
            <input type="text" placeholder="ville" id="city" class="form-control" v-model="city" />
          </div>
        </div>
        <div class="form-group d-flex justify-content-center mt-3">
          <button type="submit" class="btn popin-btn btn-block btn-primary">
            Enregister mes informations
          </button>
        </div>
        <div class="form-group d-flex justify-content-center">
          <button
            type="button"
            class="btn popin-btn btn-block btn-secondary"
            @click="$emit('hideAddress', false)"
          >
            Plus tard
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      number: "12",
      street: "test",
      postalCode: "62000",
      city: "test",
      streetType: ["rue", "impasse", "avenue", "boulevard"],
      streetTypeSelected: "rue",
      addressErrors: []
    };
  },
  methods: {
    ...mapActions("user", ["createAddress"]),
    async addressSubmit() {
      if (this.addressIsValid()) {
        try {
          this.createAddress({
            number: this.number,
            street: this.street,
            streetType: this.streetTypeSelected,
            city: this.city,
            postalCode: this.postalCode
          });
          this.$emit("hideAddress", false);
        } catch (e) {
          if (e.response && e.response.data && e.response.status === 401) {
            this.registerErrors.push(e.response.data.message);
          } else {
            console.error(e);
          }
        }
      }
    },
    addressIsValid() {
      let isValid = true;

      if (this.number === "") {
        this.addressErrors.push("Le numéro de voie est requis");
        isValid = false;
      }
      if (this.streetTypeSelected === "") {
        this.addressErrors.push("Le type de voie est requis");
        isValid = false;
      }
      if (this.street === "") {
        this.addressErrors.push("Le nom de la voie est requis");
        isValid = false;
      }
      if (this.postalCode === "") {
        this.addressErrors.push("Le code postal est requis");
        isValid = false;
      }
      if (this.city === "") {
        this.addressErrors.push("Le nom de la ville est requis");
        isValid = false;
      }

      return isValid;
    }
  }
};
</script>
