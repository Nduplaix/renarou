<template>
  <div class="cart container mt-5" v-if="currentUser && currentUser.basket">
    <div class="row">
      <div class="col-md-8 m-3 p-3 cart__shadow">
        <div class="table-responsive-sm mt-4">
          <span class="h1">Mes articles</span>
          <cart-line
            v-for="(line, index) in currentUser.basket.basketLines"
            :key="index"
            :line="line"
          />
        </div>
      </div>
      <div class="col-md-3 m-3 p-3 cart__shadow">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th>Prix total</th>
              <td
                align="right"
                v-if="currentUser.basket.price === currentUser.basket.totalWithDiscount"
              >
                {{ currentUser.basket.totalWithDiscount | toCurrency }}
              </td>
              <td align="right" v-else>
                <p class="old-price m-0">{{ currentUser.basket.price | toCurrency }}</p>
                <p class="new-price m-0">{{ currentUser.basket.totalWithDiscount | toCurrency }}</p>
              </td>
            </tr>
            <tr v-if="currentUser.basket.totalDiscount && currentUser.basket.totalDiscount !== 0">
              <th>Réduction sur le panier</th>
              <td align="right">{{ currentUser.basket.totalDiscount | toCurrency }}</td>
            </tr>
            <tr>
              <th>Délais de livraison</th>
              <td align="right">5 à 6 jours</td>
            </tr>
            <tr v-if="getDelivery">
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
          <router-link class="btn btn-secondary" :to="{ name: 'command-validation' }">
            Je passe commande
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import CartLine from "../components/Cart/CartLine";

  export default {
  components: {
    CartLine
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("command", ["deliveryModes"])
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      deliveryMode:
        typeof localStorage.getItem("delivery") !== "undefined"
          ? parseInt(localStorage.getItem("delivery"))
          : 1
    };
  },
  methods: {
    ...mapActions("command", ["fetchDeliveryModes"]),
    async init() {
      await this.fetchDeliveryModes();
      this.setDelivery();
    },
    setDelivery() {
      localStorage.setItem("delivery", this.deliveryMode);
    },
    getDelivery() {
      const deliveryId = this.deliveryMode;
      return this.deliveryModes.find(elem => elem.id === deliveryId);
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
</style>
