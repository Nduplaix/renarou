<template>
  <div id="login" class="login popin">
    <div class="popin-dialog">
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
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => {
    return { username: "nduplaix62@gmail.com", password: "azerty", errorMessage: null };
  },
  methods: {
    ...mapActions("user", ["getAuthToken"]),
    async checkForm() {
      const { username, password } = this;
      this.errorMessage = null;
      try {
        await this.getAuthToken({ username, password });
        this.$emit("hideLogin", false);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.code === 401) {
          this.errorMessage = e.response.data.message;
        } else {
          console.error(e);
        }
      }
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
