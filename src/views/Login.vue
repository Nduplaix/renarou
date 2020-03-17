<template>
  <div id="login" class="login popin">
    <div class="popin-dialog-select row">
      <div class="col active">Me connecter</div>
      <div class="col" @click="openRegister">M'inscrire</div>
    </div>
    <div class="popin-dialog">
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
            type="text"
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
      loading: false
    };
  },
  methods: {
    ...mapActions("user", ["getAuthToken"]),
    async checkForm() {
      this.loading = true;
      const { username, password, stayConnect } = this;
      this.errorMessage = null;
      try {
        await this.getAuthToken({ username, password, stayConnect });
        this.$emit("hideLogin", false);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.code === 401) {
          this.errorMessage = e.response.data.message;
        } else {
          console.error(e);
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
}
</style>
