<template>
  <div>
    <span class="h1">Mon profil</span>
    <div class="personnal-infos mt-3">
      <span class="h2">Informations personnelles</span>
      <table class="personnal-infos__table user-profile__table mt-3">
        <tbody>
          <tr>
            <th>Nom</th>
            <td>{{ currentUser.lastName }}</td>
          </tr>
          <tr>
            <th>Prénom</th>
            <td>{{ currentUser.firstName }}</td>
          </tr>
          <tr>
            <th>Adresse e-mail</th>
            <td>{{ currentUser.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="address mt-3">
      <span class="h2">Adresses</span>
      <table class="address__table user-profile__table mt-3">
        <tbody>
          <tr v-for="(address, index) in currentUser.addresses" :key="index">
            <th>Adresse n°{{ index + 1 }}</th>
            <td>
              {{ address.number }} {{ address.streetType }} {{ address.street }},
              {{ address.postalCode }} {{ address.city }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.user-profile {
  &__table {
    th {
      padding-right: $wd-padding-3;
    }
  }
}
</style>
