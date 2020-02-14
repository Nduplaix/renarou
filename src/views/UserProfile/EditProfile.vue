<template>
  <div>
    <span class="h1">Modifier mon profil</span>
    <form @submit.prevent="submitEdit">
      <div class="alert alert-danger mt-3" v-if="formErrors.length !== 0">
        <div v-for="(message, index) in formErrors" :key="index">
          {{ message }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input type="text" id="email" class="form-control" v-model="internalEmail" />
      </div>
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input type="text" class="form-control" id="firstName" v-model="internalFirstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input type="text" class="form-control" id="lastName" v-model="internalLastName" />
      </div>
      <div class="form-group d-flex justify-content-center">
        <button type="submit" class="btn popin-btn btn-block btn-primary">
          Enregister les modifications
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  watch: {
    currentUser: function() {
      this.internalEmail = this.currentUser.email;
      this.internalFirstName = this.currentUser.firstName;
      this.internalLastName = this.currentUser.lastName;
    }
  },
  mounted() {
    this.internalEmail = this.currentUser.email;
    this.internalFirstName = this.currentUser.firstName;
    this.internalLastName = this.currentUser.lastName;
  },
  data() {
    return {
      formErrors: [],
      internalFirstName: "",
      internalLastName: "",
      internalEmail: ""
    };
  },
  methods: {
    ...mapActions("user", ["updateUser"]),
    async submitEdit() {
      if (this.isValidForm()) {
        try {
          await this.updateUser({
            id: this.currentUser.id,
            email: this.internalEmail,
            firstName: this.internalFirstName,
            lastName: this.internalLastName
          });
          this.$router.push({ name: "user-profile" });
        } catch (e) {
          if (e.response && e.response.status === 401) {
            this.registerErrors.push("Erreur d'identifications");
          } else {
            console.error(e);
          }
        }
      }
    },
    isValidForm() {
      let isValid = true;
      if (this.internalLastName === "") {
        isValid = false;
        this.formErrors.push("Le nom est requis");
      }
      if (this.internalFirstName === "") {
        isValid = false;
        this.formErrors.push("Le prénom est requis");
      }
      if (this.internalEmail === "") {
        isValid = false;
        this.formErrors.push("L'adresse e-mail est requise");
      }

      return isValid;
    }
  }
};
</script>
