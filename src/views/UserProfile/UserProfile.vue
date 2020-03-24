<template>
  <div>
    <span class="h1">Mon profil</span>
    <div class="personnal-infos mt-3">
      <span class="h2">Informations personnelles</span>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          class="form-control disabled"
          disabled
          :value="currentUser.lastName"
        />
      </div>
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input
          type="text"
          class="form-control disabled"
          id="firstName"
          disabled
          :value="currentUser.firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input
          type="text"
          class="form-control disabled"
          id="lastName"
          disabled
          :value="currentUser.email"
        />
      </div>
    </div>
    <div class="address mt-3">
      <span class="h2">Adresses</span>
      <addresses-list :addresses="currentUser.addresses" />
    </div>

    <div class="my-4 text-center">
      <router-link class="btn btn-primary" :to="{ name: 'edit-profile' }">
        Modifier mon profil
      </router-link>
    </div>
    <div class="my-4 text-center">
      <router-link class="btn btn-primary" :to="{ name: 'my-addresses' }">
        Gérer mes adresses
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressesList from "../../components/Addresses/AddressesList";

export default {
  components: { AddressesList },
  computed: {
    ...mapGetters("user", ["currentUser"])
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.label {
  font-size: $wd-h2-font-size;
  font-weight: $wd-headings-font-weight;
  color: $wd-border-color-light;
}
</style>
