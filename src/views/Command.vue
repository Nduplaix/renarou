<template>
  <div>
    <div v-if="currentCommand.id">
      <span class="h1">Commande n° {{ currentCommand.id }}</span>
      <p>Réalisé le {{ currentCommand.createdAt | formatDate }}</p>
      <p>
        Status de la commande :
        <span class="font-weight-bold" :class="statusStyle(currentCommand.status.id)">
          {{ currentCommand.status.label }}
        </span>
      </p>
      <p>Mode de livraison : {{currentCommand.delivery.label}}</p>
      <p v-if="currentCommand.delivery.id === 1">Adresse de livraison : {{ currentCommand.address.fullAddress }}</p>
      <div
        class="border rounded my-2 p-3"
        v-for="(line, index) in currentCommand.commandeLines"
        :key="index"
      >
        <div class="row align-items-center">
          <div class="col-md">
            <div>
              <p>{{ line.refLabel }}</p>
            </div>
            <div>
              <p>Prix unitaire : {{ line.refPrice | toCurrency }}</p>
            </div>
          </div>
          <div class="col-md d-flex flex-column justify-content-center align-items-center">
            <p>Nombre d'articles : {{ line.quantity }}</p>
            <div>
              <p>
                {{
                  line.refDiscount !== "0" ? `Promo : - ${line.reference.product.discount} %` : ""
                }}
              </p>
            </div>
            <div class="row">
              <div class="col">Prix total :</div>
              <div v-if="line.price === line.priceWithDiscount">
                <p>{{ line.price|toCurrency }}</p>
              </div>
              <div class="col" v-else>
                <p class="old-price m-0">{{ line.price | toCurrency }}</p>
                <p class="new-price m-0">{{ line.priceWithDiscount | toCurrency }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "../components/Loading";

export default {
  computed: {
    ...mapGetters("command", ["currentCommand"]),
    ...mapGetters("user", ["getUserLogged", "currentUser"])
  },
  components: {
    Loading
  },
  async mounted() {
    if (this.getUserLogged) {
      await this.getCommand();
    }
  },
  watch: {
    async currentUser() {
      await this.getCommand();
    }
  },
  methods: {
    ...mapActions("command", ["fetchCurrentCommand"]),
    async getCommand() {
      try {
        await this.fetchCurrentCommand(this.$route.params);
      } catch (e) {
        console.log(e);
      }
    },
    statusStyle(statusId) {
      switch (statusId) {
        case 1:
          return "text-danger";
        case 5:
          return "text-success";
        default:
          return "text-warning";
      }
    }
  }
};
</script>
