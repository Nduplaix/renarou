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
    <validation-pop-up type="danger" v-if="commandError" @close="commandError = false">
      Une erreur est survenue lors de votre commande. {{errorMessage}}
    </validation-pop-up>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ValidationPopUp from "../components/PopUp/ValidationPopUp";

export default {
  components: {
    ValidationPopUp
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("command", ["deliveryModes", "paymentIntent"])
  },
  data() {
    return {
      deliveryAddress: this.currentUser ? this.currentUser.addresses[0].id : null,
      deliveryMode: this.deliveryModes ? this.deliveryModes[0].id : null,
      stripePublicKey: process.env.VUE_APP_STRIPE_PUBLIC,
      stripe: null,
      elements: null,
      card: null,
      commandError: false,
      errorMessage: "",
      commandId: null
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

    this.stripe = Stripe(this.stripePublicKey);
    this.elements = this.stripe.elements();
    this.card = this.elements.create("card");

    this.card.mount("#card-element");

    this.card.addEventListener("change", function(event) {
      let displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
  },
  methods: {
    ...mapActions("command", [
      "fetchDeliveryModes",
      "createPayment",
      "createCommand",
      "updateCommand"
    ]),
    async submitCommand() {
      try {
        const command = await this.createCommand({
          deliveryId: this.deliveryMode,
          addressId: this.deliveryAddress
        });

        this.commandId = command.id;

        await this.createPayment({
          amount: this.currentUser.basket.totalWithDiscount,
          user: this.currentUser
        });

        this.stripe
          .confirmCardPayment(this.paymentIntent.client_secret, {
            payment_method: {
              card: this.card,
              billing_details: {
                name: `${this.currentUser.firstName} ${this.currentUser.lastName}`
              }
            }
          })
          .then(result => {
            this.paymentSuccess(result);
          });
      } catch (e) {
        console.error(e);
        this.commandError = true;
        this.errorMessage = e.data.message;
      }
    },
    async getDeliveryModes() {
      try {
        await this.fetchDeliveryModes();
      } catch (e) {
        console.log(e);
      }
    },
    async paymentSuccess(result) {
      if (result.error) {
        // Show error to your customer
        console.log(result.error.message);
        this.commandError = true;
        this.errorMessage = result.error.message;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          try {
            await this.updateCommand({ id: this.commandId });
            this.$router.push("/");
          } catch (e) {
            console.error(e);
            this.commandError = true;
            this.errorMessage = e.data.message;
          }
        }
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
