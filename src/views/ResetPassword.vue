<template>
  <div class="mt-5 container">
    <span class="h1">Réinitialisé votre mot de passe</span>
    <form @submit.prevent="submitForm">
      <div class="alert alert-danger mt-3" v-if="formErrors.length !== 0">
        <div v-for="(message, index) in formErrors" :key="index">
          {{ message }}
        </div>
      </div>
      <div class="alert alert-success mt-3" role="alert" v-if="successMessage">
        {{ successMessage }}
      </div>
      <div class="form-group">
        <label for="new-password">Nouveau mot de passe</label>
        <input type="password" class="form-control" id="new-password" v-model="newPassword" />
      </div>
      <div class="form-group">
        <label for="confirm-new-password">Confirmation du mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="confirm-new-password"
          v-model="confirmPassword"
        />
      </div>
      <div class="form-group d-flex justify-content-center">
        <button type="submit" class="btn popin-btn btn-block btn-primary">
          Enregister mon nouveau mot de passe
        </button>
      </div>
    </form>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "../components/Loading";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  components: {
    Loading
  },
  data() {
    return {
      formErrors: [],
      successMessage: null,
      newPassword: "",
      confirmPassword: "",
      loading: false
    };
  },
  methods: {
    ...mapActions("user", ["resetPassword"]),
    async submitForm() {
      this.loading = true;

      if (this.isValidForm()) {
        try {
          const token = (new URLSearchParams(window.location.search)).get('token');

          await this.resetPassword({
            token,
            password: this.newPassword,
            confirmPassword: this.confirmPassword
          });
          this.successMessage = "Votre mot de passe est bien réinitialisé.";
        } catch (e) {
          if (e.response && e.response.data && e.response.status === 401) {
            this.formErrors.push(e.response.data.message);
          } else {
            console.error(e);
          }
        }
      }

      this.loading = false;
    },
    isValidForm() {
      let isValid = true;
      this.formErrors = [];
      this.successMessage = null;

      if (this.newPassword === "") {
        isValid = false;
        this.formErrors.push("Le nouveau mot de passe est requis");
      }
      if (this.confirmPassword === "") {
        isValid = false;
        this.formErrors.push("La confirmation du nouveau mot de passe est requise");
      }
      if (this.confirmPassword !== this.newPassword) {
        isValid = false;
        this.formErrors.push("Les mots de passent doivent être identiques");
      }

      return isValid;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.container {
  max-width: $wd-popup-content-width-medium;
}
</style>
