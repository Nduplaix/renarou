<template>
  <div class="register">
    <div class="popin" v-if="currentStep === registerStep">
      <div class="popin-dialog">
        <div class="popin-dialog-select row">
          <div class="col" @click="openLogin">Me connecter</div>
          <div class="col active">M'inscrire</div>
        </div>
        <span class="h1">Inscription</span>
        <form @submit.prevent="registerSubmit">
          <div class="alert alert-danger mt-3" v-if="registerErrors.length !== 0">
            <div v-for="(message, index) in registerErrors" :key="index">
              {{ message }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Adresse e-mail</label>
            <input type="text" id="email" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName">
          </div>
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input type="text" class="form-control" id="lastName" v-model="lastName">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmation de mot de passe</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
            />
          </div>
          <div class="form-group d-flex justify-content-center">
            <button type="submit" class="btn popin-btn btn-block btn-primary">
              Enregister mon profile
            </button>
          </div>
          <div class="form-group d-flex justify-content-center">
            <button
              type="button"
              class="btn popin-btn btn-block btn-secondary"
              @click="$emit('hideRegister', false)"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
    <address-form v-if="currentStep === addressStep" @hideAddress="$emit('hideRegister', false)" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { AddressForm } from "../components/Form";

export default {
  components: { AddressForm },
  data() {
    return {
      currentStep: 1,
      registerStep: 1,
      addressStep: 2,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      registerErrors: []
    };
  },
  methods: {
    ...mapActions("user", ["register"]),
    async registerSubmit() {
      if (this.registerIsValid()) {
        try {
          await this.register({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          });
          this.currentStep = this.addressStep;
        } catch (e) {
          if (e.response && e.response.data && e.response.status === 401) {
            this.registerErrors.push(e.response.data.message);
          } else {
            console.error(e);
          }
        }
      }
    },
    registerIsValid() {
      let isValid = true;

      if (this.email === "") {
        this.registerErrors.push("L'email est requis");
        isValid = false;
      }
      if (this.firstName === "") {
        this.registerErrors.push("Le prénom est requis");
        isValid = false;
      }
      if (this.lastName === "") {
        this.registerErrors.push("Le nom est requis");
        isValid = false;
      }
      if (this.password === "") {
        this.registerErrors.push("Le mot de passe est requis");
        isValid = false;
      }
      if (this.password !== this.confirmPassword) {
        this.registerErrors.push("les mots de passes doivent être identiques");
        isValid = false;
      }

      return isValid;
    },
    openLogin() {
      this.$emit("hideRegister", false);
      this.$emit("openLogin");
    }
  }
};
</script>
