<template>
  <div id="login" class="login popin">
    <div class="popin-dialog-select row">
      <div class="col active">Me connecter</div>
      <div class="col" @click="openRegister">M'inscrire</div>
    </div>
    <div class="popin-dialog" v-if="login">
      <div class="popin-dialog-close" @click="$emit('hideLogin', false)">
        <i class="fas fa-times"></i>
      </div>
      <span class="h1">Connexion</span>
      <form @submit.prevent="checkForm">
        <div class="alert alert-danger" role="alert" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <label for="username">
            Adresse email
          </label>
          <input
            type="email"
            class="form-control"
            id="username"
            name="username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            class="form-control"
            name="password"
            v-model="password"
          />
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="stay-connect" v-model="stayConnect" />
          <label class="form-check-label" for="stay-connect">
            Rester connecté
          </label>
        </div>
        <div>
          <a role="button" class="text-primary forgot-password" @click="login = false">
            Mot de passe oublié?
          </a>
        </div>
        <button type="submit" id="submit" class="popin-btn btn btn-primary btn-block">
          Connexion
        </button>
        <button
          type="button"
          class="popin-btn btn btn-secondary btn-block"
          @click="$emit('hideLogin', false)"
        >
          Retour
        </button>
      </form>
    </div>

    <!-- Reset Password -->

    <div class="popin-dialog" v-else>
      <div class="popin-dialog-close" @click="$emit('hideLogin', false)">
        <i class="fas fa-times"></i>
      </div>
      <span class="h1">Mot de passe Oublié</span>
      <form @submit.prevent="sendMail">
        <div class="alert alert-danger" role="alert" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="alert alert-success" role="alert" v-if="successMessage">
          {{ successMessage }}
        </div>
        <div class="form-group">
          <label for="username">
            Adresse email
          </label>
          <input
            type="email"
            class="form-control"
            id="username"
            name="username"
            v-model="username"
          />
        </div>
        <button type="submit" id="submit" class="popin-btn btn btn-primary btn-block">
          Envoyer un e-mail
        </button>
        <button
          type="button"
          class="popin-btn btn btn-secondary btn-block"
          @click="$emit('hideLogin', false)"
        >
          Annuler
        </button>
      </form>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../components/Loading";

export default {
  components: {
    Loading
  },
  data: () => {
    return {
      username: "",
      password: "",
      stayConnect: true,
      errorMessage: null,
      loading: false,
      login: true,
      successMessage: null
    };
  },
  methods: {
    ...mapActions("user", ["getAuthToken", "sendResetPassword"]),
    async checkForm() {
      this.loading = true;
      const { username, password, stayConnect } = this;
      this.errorMessage = null;
      try {
        await this.getAuthToken({ username, password, stayConnect });
        this.$emit("hideLogin", false);
      } catch (e) {
        if (e.response && e.response.data && e.response.status === 401) {
          this.errorMessage = "Identifiants incorrect";
        }
      }
      this.loading = false;
    },
    async sendMail() {
      this.loading = true;
      this.successMessage = null;
      this.errorMessage = null;
      try {
        await this.sendResetPassword({ email: this.username });
        this.successMessage = "Un e-mail vient de vous être envoyé.";
      } catch (e) {
        if (e.response && e.response.data && e.response.status === 401) {
          this.errorMessage = e.response.data.message;
        }
      }
      this.loading = false;
    },
    openRegister() {
      this.$emit("hideLogin", false);
      this.$emit("openRegister");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.login {
  .popin-btn {
    margin-top: $wd-margin-large;
  }
  .forgot-password {
    cursor: pointer;
  }
}
</style>
