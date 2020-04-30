<template>
  <div class="popin">
    <div class="popin-dialog" :class="{ 'text-center': !isMobile() }">
      <span class="h1"><slot>Informations de livraison</slot></span>
      <form @submit.prevent="addressSubmit">
        <div class="alert alert-danger mt-3" v-if="addressErrors.length !== 0">
          <div v-for="(message, index) in addressErrors" :key="index">
            {{ message }}
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="col-md-3 form-group">
            <label for="number">numéro</label>
            <input
              type="text"
              class="form-control"
              placeholder="numéro"
              v-model="internalNumber"
              id="number"
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="streetType">type de voie</label>
            <select class="form-control" v-model="internalStreetTypeSelected" id="streetType">
              <option v-for="(type, index) in streetType" :key="index">{{ type }}</option>
            </select>
          </div>
          <div class="col form-group">
            <label for="street">nom de la voie</label>
            <input
              type="text"
              class="form-control"
              placeholder="voie"
              v-model="internalStreet"
              id="street"
            />
          </div>
        </div>
        <div class="mt-3 form-group">
          <label for="complement">Complément d'adresse</label>
          <textarea rows="2" id="complement" v-model="internalComplement" />
        </div>
        <div class="form-row mt-3">
          <div class="col-md-4 form-group">
            <label for="postalCode">Code postal</label>
            <input
              type="text"
              placeholder="code postal"
              id="postalCode"
              class="form-control"
              v-model="internalPostalCode"
            />
          </div>
          <div class="col form-group">
            <label for="city">Ville</label>
            <input
              type="text"
              placeholder="ville"
              id="city"
              class="form-control"
              v-model="internalCity"
            />
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
            {{ cancelButtonLabel }}
          </button>
        </div>
      </form>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../Loading";

export default {
  props: {
    id: { default: null },
    number: { default: "" },
    streetTypeSelected: { default: "" },
    street: { default: "" },
    complement: { default: "" },
    city: { default: "" },
    postalCode: { default: "" },
    cancelButtonLabel: { default: "Plus tard" },
    edit: { default: false }
  },
  data() {
    return {
      internalNumber: this.number,
      internalStreet: this.street,
      internalComplement: this.complement,
      internalPostalCode: this.postalCode,
      internalCity: this.city,
      streetType: ["rue", "impasse", "avenue", "boulevard"],
      internalStreetTypeSelected: this.streetTypeSelected,
      addressErrors: [],
      loading: false
    };
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions("user", ["editAddress", "createAddress"]),
    async addressSubmit() {
      this.loading = true;
      if (this.addressIsValid()) {
        try {
          if (!this.edit) {
            await this.createAddress({
              number: this.internalNumber,
              street: this.internalStreet,
              streetType: this.internalStreetTypeSelected,
              complement: this.internalComplement,
              city: this.internalCity,
              postalCode: this.internalPostalCode
            });
          } else {
            await this.editAddress({
              id: this.id,
              number: this.internalNumber,
              street: this.internalStreet,
              streetType: this.internalStreetTypeSelected,
              complement: this.internalComplement,
              city: this.internalCity,
              postalCode: this.internalPostalCode
            });
          }
          this.$emit("hideAddress", false);
        } catch (e) {
          if (e.response && e.response.data && e.response.status === 401) {
            this.registerErrors.push(e.response.data.message);
          }
        }
      }
      this.loading = false;
    },
    addressIsValid() {
      let isValid = true;

      if (this.internalNumber === "") {
        this.addressErrors.push("Le numéro de voie est requis");
        isValid = false;
      }
      if (this.internalStreetTypeSelected === "") {
        this.addressErrors.push("Le type de voie est requis");
        isValid = false;
      }
      if (this.internalStreet === "") {
        this.addressErrors.push("Le nom de la voie est requis");
        isValid = false;
      }
      if (this.internalPostalCode === "") {
        this.addressErrors.push("Le code postal est requis");
        isValid = false;
      }
      if (this.internalCity === "") {
        this.addressErrors.push("Le nom de la ville est requis");
        isValid = false;
      }

      return isValid;
    }
  }
};
</script>
