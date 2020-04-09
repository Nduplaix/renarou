<template>
  <div class="container">
    <div class="command-confirm p-3 m-3" v-if="currentUser && currentUser.basket">
      <span class="h1">Résumé des articles</span>
      <command-line
        v-for="(line, index) in currentUser.basket.basketLines"
        :key="index"
        :line="line"
      />
    </div>
    <form @submit.prevent="submitCommand">
      <div class="command-confirm p-3 m-3 text-center">
        <div v-if="currentUser && deliveryMode && deliveryModes">
          <span class="h1">Informations de la commandes</span>
          <form
            class="col-md-6 offset-md-3 mt-5"
            v-if="null === discountCode"
            @submit.prevent="submitDiscountCode"
          >
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="CODE PROMO"
                v-model="internalDiscountCode"
              />
            </div>
            <div v-if="discountCodeError" class="text-danger">
              <p>{{ discountCodeError }}</p>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Valider le code promo</button>
            </div>
          </form>
          <div class="form-group col-md-6 offset-md-3">
            <label for="delivery-mode">Mode de livraison</label>
            <select
              id="delivery-mode"
              class="form-control"
              v-model="deliveryMode"
              @change="updateDeliveryAddress"
            >
              <option :value="delivery.id" v-for="(delivery, index) in deliveryModes" :key="index">
                {{ delivery.label }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-6 offset-md-3" v-if="deliveryMode === 1">
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
            <button type="button" class="btn btn-primary mt-3" @click="showAddressForm = true">
              <i class="fas fa-plus"></i> Ajouter une nouvelle adresse
            </button>
          </div>
        </div>
        <div v-if="currentUser && currentUser.basket">
          <span class="h1">Récapitulatif</span>
          <div class="my-3">
            <p>
              Frais de port :
              <span v-if="deliveryMode === 1">
                {{ getDeliveryFromId(this.deliveryMode).shippingPrice | toCurrency }}
              </span>
              <span v-else><span class="font-weight-bold text-primary">Gratuit</span></span>
            </p>
            <p>Réduction sur la commande : {{ currentUser.basket.totalDiscount | toCurrency }}</p>
            <p v-if="discountCode && discountCode.isPercent">
              Code promo: - {{ discountCode.amount }} %
            </p>
            <p v-else-if="discountCode">Code promo: - {{ discountCode.amount | toCurrency }}</p>
            <p>
              Prix total de la commande :
              <span
                v-if="
                  currentUser.basket.price === currentUser.basket.totalWithDiscount &&
                    discountCode === null
                "
              >
                {{
                  (currentUser.basket.totalWithDiscount +
                    getDeliveryFromId(this.deliveryMode).shippingPrice)
                    | toCurrency
                }}
              </span>
              <span v-else>
                <span class="old-price">
                  {{
                    (currentUser.basket.price + getDeliveryFromId(this.deliveryMode).shippingPrice)
                      | toCurrency
                  }}
                </span>
                <span class="new-price">
                  {{ totalPrice() | toCurrency }}
                </span>
              </span>
            </p>
          </div>
        </div>
        <div>
          <span class="h1">Paiement</span>
          <div class="form-group col-md-4 offset-md-4" v-if="deliveryMode === 2">
            <label for="payment-select">Moyen de paiement</label>
            <select v-model="currentPayment" class="form-control" id="payment-select">
              <option :value="payment.id" v-for="(payment, index) in payments" :key="index">
                {{ payment.label }}
              </option>
            </select>
          </div>
          <div class="col-md-4 offset-md-4" v-show="currentPayment === 1">
            <div id="card-element" class="my-3"><!-- Card number input--></div>

            <!-- We'll put the error messages in this element -->
            <div id="card-errors" role="alert" class="my-3"></div>
          </div>

          <div class="form-group col-md-6 offset-md-3">
            <button id="submit" class="btn btn-primary my-3">Valider et payer</button>
          </div>
          <div class="form-group col-md-6 offset-md-3" v-if="null !== discountCode">
            <button
              type="button"
              class="btn btn-secondary"
              @click="
                () => {
                  this.cancelDiscountCode();
                  showSuccessDiscount = false;
                }
              "
            >
              Annuler le code promo
            </button>
          </div>
        </div>
      </div>
    </form>
    <validation-pop-up type="danger" v-if="commandError" @close="commandError = false">
      Une erreur est survenue lors de votre commande. {{ errorMessage }}
    </validation-pop-up>
    <address-form
      v-if="showAddressForm"
      cancel-button-label="Annuler"
      @hideAddress="showAddressForm = false"
    >
      Ajouter une adresse
    </address-form>
    <loading v-if="loading" />
    <validation-pop-up
      type="success"
      v-if="showSuccessDiscount"
      @close="showSuccessDiscount = false"
    >
      Votre code promo est bien pris en compte
    </validation-pop-up>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ValidationPopUp from "../components/PopUp/ValidationPopUp";
import CommandLine from "../components/Cart/CommandLine";
import Loading from "../components/Loading";
import AddressForm from "../components/Form/AddressForm";

export default {
  components: {
    ValidationPopUp,
    CommandLine,
    Loading,
    AddressForm
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("command", ["deliveryModes", "paymentIntent"]),
    ...mapGetters("cart", ["discountCode"])
  },
  data() {
    return {
      internalDiscountCode: null,
      discountCodeError: null,
      deliveryAddress: null,
      deliveryMode:
        typeof localStorage.getItem("delivery") !== "undefined"
          ? parseInt(localStorage.getItem("delivery"))
          : 1,
      stripePublicKey: process.env.VUE_APP_STRIPE_PUBLIC,
      stripe: null,
      elements: null,
      card: null,
      commandError: false,
      errorMessage: "",
      commandId: null,
      paymentMethod: null,
      currentPayment: 1,
      payments: [
        {
          id: 1,
          label: "Carte bancaire"
        },
        {
          id: 2,
          label: "Espèce lors du retrait"
        }
      ],
      showAddressForm: false,
      loading: false,
      showSuccessDiscount: false,
    };
  },
  watch: {
    currentUser: function() {
      this.deliveryAddress = this.currentUser.addresses[0].id;
    }
  },
  mounted() {
    this.getDeliveryModes();

    if (this.currentUser && this.currentUser.addresses) {
      this.deliveryAddress = this.currentUser.addresses[0].id;
    }

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
    ...mapActions("cart", ["fetchDiscountCode", "cancelDiscountCode"]),
    async submitCommand() {
      this.loading = true;
      if (this.deliveryMode === 2 && this.currentPayment === 2) {
        try {
          await this.sendCommand();
          this.$router.push({ name: "home" });
        } catch (e) {
          this.loading = false;
          this.commandError = true;
          this.errorMessage = e.response.data.message;
        }
      } else {
        await this.stripe
          .createPaymentMethod({
            type: "card",
            card: this.card,
            billing_details: {
              name: `${this.currentUser.firstName} ${this.currentUser.lastName}`
            }
          })
          .then(result => {
            if (result.error) {
              this.loading = false;
              this.commandError = true;
              this.errorMessage = result.error.message;
            } else {
              this.continuePayment();
            }
          });
      }
    },
    async getDeliveryModes() {
      try {
        await this.fetchDeliveryModes();
      } catch (e) {
        console.log(e);
      }
    },
    getDeliveryFromId(id) {
      return this.deliveryModes.find(elem => elem.id === id);
    },
    async continuePayment() {
      try {
        await this.createPayment({
          amount: this.totalPrice(),
          user: this.currentUser
        });

        this.commandId = await this.sendCommand();

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
        this.loading = false;
        this.commandError = true;
        if (e.data) {
          console.error(e);
          this.errorMessage = e.data.message;
        } else if (e.response && e.response.data) {
          console.error(e.response.data);
          this.errorMessage = e.response.data.message;
        }
      }
    },
    async paymentSuccess(result) {
      if (result.error) {
        this.loading = false;
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
    },
    async sendCommand() {
      const command = await this.createCommand({
        discountId: this.discountCode ? this.discountCode.id : null,
        deliveryId: this.deliveryMode,
        addressId: this.deliveryAddress
      });

      return command.id;
    },
    updateDeliveryAddress() {
      this.currentPayment = 1;
      localStorage.setItem("delivery", this.deliveryMode);
    },
    async submitDiscountCode() {
      this.discountCodeError = null;
      try {
        await this.fetchDiscountCode({ code: this.internalDiscountCode });
        this.showSuccessDiscount = true;
      } catch (e) {
        if (e.response && e.response.data && e.response.status === 401) {
          this.discountCodeError = e.response.data.message;
        }
      }
    },
    totalPrice() {
      let commandPrice = this.currentUser.basket.totalWithDiscount;

      if (this.discountCode && this.discountCode.isPercent) {
        let discount = Math.round(commandPrice * this.discountCode.amount) / 100;

        commandPrice = Math.round((commandPrice - discount) * 100) / 100;
      } else if (this.discountCode) {
        commandPrice = commandPrice - this.discountCode.amount;
      }

      commandPrice += this.getDeliveryFromId(this.deliveryMode).shippingPrice;
      return commandPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.command-confirm {
  box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.11);
}
</style>
