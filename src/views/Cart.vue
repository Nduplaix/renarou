<template>
  <div class="cart container mt-5">
    <div class="row">
      <div class="col-md-8 m-3 p-3 cart__shadow">
        <div class="table-responsive-sm mt-4">
          <span class="h1">Mes articles</span>
          <table class="table table-hover mt-2 text-center">
            <thead>
              <th>Image</th>
              <th>Nom de l'article</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Promo</th>
              <th>Prix total</th>
              <th>actions</th>
            </thead>
            <tbody v-if="currentUser.basket">
              <cart-line
                v-for="(line, index) in currentUser.basket.basketLines"
                :key="index"
                :line="line"
              />
            </tbody>
          </table>
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
                {{ currentUser.basket.price | toCurrency }}
              </td>
              <td align="right" v-else>
                <p class="old-price m-0">{{ currentUser.basket.price | toCurrency }}</p>
                <p class="new-price m-0">{{ currentUser.basket.totalWithDiscount | toCurrency }}</p>
              </td>
            </tr>
            <tr v-if="currentUser.basket.totalDiscount && currentUser.basket.totalDiscount !== 0">
              <th>Réduction sur le panier</th>
              <td align="right">{{ currentUser.basket.totalDiscount|toCurrency }}</td>
            </tr>
            <tr>
              <th>Frais de port</th>
              <td align="right">TO FIX</td>
            </tr>
            <tr>
              <th>Délais de livraison</th>
              <td align="right">5 à 6 jours</td>
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
          <button type="button" class="btn btn-secondary">Je passe commande</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartLine from "../components/Cart/CartLine";

export default {
  components: {
    CartLine
  },
  computed: {
    ...mapGetters("user", ["currentUser"])
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
