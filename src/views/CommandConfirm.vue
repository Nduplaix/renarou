<template>
  <div class="container">
    <form @submit.prevent="submitCommand"></form>
    <div class="command-confirm p-3 m-3">
      <span class="h1">Informations de la commandes</span>
      <div class="row mt-3">
        <div class="form-group col-md">
          <label for="delivery-address">Adresse de livraison</label>
          <select id="delivery-address" class="form-control" v-model="deliveryAddress">
            <option
              :value="address.id"
              v-for="(address, index) in currentUser.addresses"
              :key="index"
            >
              {{ address.fullAddress }}
            </option>
          </select>
        </div>
        <div class="form-group col-md">
          <label for="delivery-mode">Mode de livraison</label>
          <select id="delivery-mode" class="form-control" v-model="deliveryMode">
            <option :value="delivery.id" v-for="(delivery, index) in deliveryModes" :key="index">
              {{ delivery.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("command", ["deliveryModes"])
  },
  data() {
    return {
      deliveryAddress: this.currentUser ? this.currentUser.addresses[0].id : null,
      deliveryMode: this.deliveryModes ? this.deliveryModes[0].id : null
    };
  },
  watch: {
    currentUser: function() {
      this.deliveryAddress = this.currentUser.addresses[0].id;
    },
    deliveryModes: function() {
      this.deliveryMode = this.deliveryModes[0].id;
    }
  },
  mounted() {
    this.getDeliveryModes();
  },
  methods: {
    ...mapActions("command", ["fetchDeliveryModes"]),
    submitCommand() {
      return;
    },
    async getDeliveryModes() {
      try {
        await this.fetchDeliveryModes();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.command-confirm{
  box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.11);
}
</style>
