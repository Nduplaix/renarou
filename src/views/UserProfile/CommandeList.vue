<template>
  <div class="command-list">
    <div class="text-center">
      <span class="h1">Liste de mes commandes</span>
      <div v-if="commandes">
        <div
          v-for="(command, index) in commandes"
          :key="index"
          class="command-list__item row border p-3 my-3"
        >
          <div class="col-md">
            <p>
              Commande <span class="font-weight-bold">n°{{ command.id }}</span>
            </p>
            <p>
              Status de la commande : <br>
              <span class="font-weight-bold" :class="statusStyle(command.status.id)">
                {{ command.status.label }}
              </span>
            </p>
            <p>
              Réalisé le <span class="font-weight-bold">{{ command.createdAt | formatDate }}</span>
            </p>
          </div>
          <div class="col-md">
            <p>
              Prix de la commande :
              <span class="font-weight-bold">{{ command.priceWithDiscount | toCurrency }}</span>
            </p>
            <p>
              Nombre d'article : <span class="font-weight-bold">{{ command.productCount }}</span>
            </p>
            <p>
              Mode de livraison : <span class="font-weight-bold">{{ command.delivery.label }}</span>
            </p>
          </div>
          <div class="col-md-2">
            <router-link
              class="btn btn-primary"
              :to="{ name: 'commandShow', params: { id: command.id } }"
            >
              <i class="fas fa-eye"></i>
              Voir
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  mounted() {
    if (this.currentUser && this.currentUser.commandes) {
      this.commandes = this.currentUser.commandes.reverse();
    }
  },
  watch: {
    currentUser() {
      if (this.currentUser.commandes) {
        this.commandes = this.currentUser.commandes.reverse();
      }
    }
  },
  data() {
    return {
      commandes: null
    };
  },
  methods: {
    statusStyle(statusId) {
      switch (statusId) {
        case 1:
          return "text-danger";
        case 2 || 3 || 4:
          return "text-warning";
        case 5:
          return "text-success";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.command-list {
  &__item {
    align-items: center;
  }
}
</style>
