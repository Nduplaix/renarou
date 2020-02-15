<template>
  <div>
    <span class="h1">Modifier mon mot de passe</span>
    <form @submit.prevent="submitForm">
      <div class="alert alert-danger mt-3" v-if="formErrors.length !== 0">
        <div v-for="(message, index) in formErrors" :key="index">
          {{ message }}
        </div>
      </div>
      <div class="form-group">
        <label for="old-password">Ancien mot de passe</label>
        <input type="password" id="old-password" class="form-control" v-model="oldPassword" />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },

  data() {
    return {
      formErrors: [],
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    ...mapActions("user", ["updatePassword", "checkPassword"]),
    async submitForm() {
      if (this.isValidForm()) {
        try {
          await this.checkPassword({
            id: this.currentUser.id,
            plainPassword: this.oldPassword
          });
          await this.updatePassword({
            id: this.currentUser.id,
            plainPassword: this.newPassword
          });
          this.$router.push({ name: "user-profile" });
        } catch (e) {
          if (e.response && e.response.data && e.response.data.code === 401) {
            this.formErrors.push(e.response.data.message);
          } else if (e.response && e.response.status === 401) {
            this.registerErrors.push("Erreur d'identifications");
          } else {
            console.error(e);
          }
        }
      }
    },
    isValidForm() {
      let isValid = true;
      this.formErrors = [];

      if (this.newPassword === "") {
        isValid = false;
        this.formErrors.push("Le nouveau mot de passe est requis");
      }
      if (this.oldPassword === "") {
        isValid = false;
        this.formErrors.push("L'ancien mot de passe est requis");
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
