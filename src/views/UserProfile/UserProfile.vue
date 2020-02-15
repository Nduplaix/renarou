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
      <addresses-list :addresses="currentUser.addresses" />
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
