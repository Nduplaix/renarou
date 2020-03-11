<template>
  <div class="cart container mt-5" v-if="basket">
    <div class="row">
      <div class="col-md-8 m-3 p-3 cart__shadow">
        <div class="table-responsive-sm mt-4">
          <span class="h1">Mes articles</span>
          <div class="alert alert-warning text-center" v-if="basket.basketLines.length <= 0">
            <p>Votre panier est vide</p>
          </div>
          <cart-line
            v-for="(line, index) in basket.basketLines"
            :key="index"
            :line="line"
            :user-logged="getUserLogged"
            :index="index"
          />
        </div>
      </div>
      <div class="col-md-3 m-3">
        <div class="p-3 cart__shadow">
          <table class="table table-borderless">
            <tbody>
            <tr>
              <th>Prix total</th>
              <td align="right" v-if="basket.price === basket.totalWithDiscount">
                {{ basket.totalWithDiscount | toCurrency }}
              </td>
              <td align="right" v-else>
                <p class="old-price m-0">{{ basket.price | toCurrency }}</p>
                <p class="new-price m-0">{{ basket.totalWithDiscount | toCurrency }}</p>
              </td>
            </tr>
            <tr v-if="basket.totalDiscount && basket.totalDiscount !== 0">
              <th>Réduction sur le panier</th>
              <td align="right">{{ basket.totalDiscount | toCurrency }}</td>
            </tr>
            <tr>
              <th>Délais de livraison</th>
              <td align="right">5 à 6 jours</td>
            </tr>
            <tr v-if="getDelivery()">
              <th>Frais de port</th>
              <td align="right" v-if="getDelivery().shippingPrice === 0">
                <span class="text-primary font-weight-bold">Gratuit</span>
              </td>
              <td align="right" v-else>{{getDelivery().shippingPrice | toCurrency}}</td>
            </tr>
            <tr>
              <th><label for="delivery-mode">Mode de livraison</label></th>
              <td>
                <select id="delivery-mode" class="form-control" v-model="deliveryMode" @change="setDelivery()">
                  <option
                    :value="delivery.id"
                    v-for="(delivery, index) in deliveryModes"
                    :key="index"
                  >
                    {{ delivery.label }}
                  </option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <form>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="CODE PROMO" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Valider le code promo</button>
            </div>
          </form>
          <div class="form-group">
            <button
              type="button"
              class="btn btn-secondary"
              :disabled="basket.basketLines.length <= 0"
              @click="submitCart"
              v-if="getUserLogged"
            >
              Je passe commande
            </button>
            <button type="button" class="btn btn-secondary" @click="submitCart" v-else>
              Me connecter pour passer ma commande
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartLine from "../components/Cart/CartLine";

export default {
  components: {
    CartLine
  },
  computed: {
    ...mapGetters("user", ["currentUser", "getUserLogged"]),
    ...mapGetters("cart", ["getBasket"]),
    ...mapGetters("command", ["deliveryModes"])
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      basket: null,
      deliveryMode:
        typeof localStorage.getItem("delivery") !== "undefined"
          ? parseInt(localStorage.getItem("delivery"))
          : 1
    };
  },
  watch: {
    currentUser() {
      this.basket = this.currentUser.basket;
    }
  },
  methods: {
    ...mapActions("command", ["fetchDeliveryModes"]),
    async init() {
      await this.fetchDeliveryModes();
      this.setDelivery();

      if (this.getUserLogged) {
        this.basket = this.currentUser && this.currentUser.basket ? this.currentUser.basket : null;
      } else {
        this.basket = this.getBasket;
      }
    },
    setDelivery() {
      localStorage.setItem("delivery", this.deliveryMode);
    },
    getDelivery() {
      const deliveryId = this.deliveryMode;
      return this.deliveryModes.find(elem => elem.id === deliveryId);
    },
    submitCart() {
      if (!this.getUserLogged) {
        this.$emit("openLogin", true);
      } else if (this.basket.basketLines.length > 0) {
        this.$router.push({ name: "command-validation" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.cart {
  &__shadow {
    box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.11);
  }
}
button:disabled {
  cursor: not-allowed;
}
</style>
