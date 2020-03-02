<template>
  <div class="container">
    <form @submit.prevent="submitCommand">
      <div class="command-confirm p-3 m-3">
        <div>
          <span class="h1">Informations de la commandes</span>
          <div class="form-group col-md-6 offset-md-3">
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
          <div class="form-group col-md-6 offset-md-3">
            <label for="delivery-mode">Mode de livraison</label>
            <select id="delivery-mode" class="form-control" v-model="deliveryMode">
              <option :value="delivery.id" v-for="(delivery, index) in deliveryModes" :key="index">
                {{ delivery.label }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <span class="h1">Paiement</span>
          <div class="col-md-4 offset-md-4">
            <div id="card-element" class="my-3"><!-- Card number input--></div>

            <!-- We'll put the error messages in this element -->
            <div id="card-errors" role="alert" class="my-3"></div>

            <button id="submit" class="btn btn-primary my-3">Valider et payer</button>
          </div>
        </div>
      </div>
    </form>
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
      deliveryMode: this.deliveryModes ? this.deliveryModes[0].id : null,
      stripePublicKey: process.env.STRIPE_PUBLIC
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
    let stripe = Stripe(`${process.env.STRIPE_PUBLIC}`);
    let elements = stripe.elements();

    // Set up Stripe.js and Elements to use in checkout form
    let style = {
      base: {
        color: "#32325d"
      }
    };

    let card = elements.create("card", { style: style });
    card.mount("#card-element");

    card.addEventListener("change", function(event) {
      let displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
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
  text-align: center;
  box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.11);
}
</style>
