<template>
  <div class="mt-5 container text-center">
    <div v-if="valid">
      <span class="h1">
        Votre adresse mail est maintenant activé vous pouvez désormé passer commande.
      </span>
    </div>
    <div v-else class="alert alert-danger">
      <span class="h1">Une erreur s'est produite lors de l'activation de votre adresse e-mail</span>
      <p>{{ message }}</p>
    </div>

    <div class="mt-3 text-center">
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        Retourner à l'accueil
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      message: "",
      valid: false
    };
  },
  mounted() {
    // const token = this.$route.params.token;
    const token = (new URLSearchParams(window.location.search)).get('token');
    console.log(token);

    this.activeMail(token);
  },
  methods: {
    ...mapActions("user", ["emailActivation"]),
    async activeMail(token) {
      try {
        await this.emailActivation({ token });
        this.valid = true;
      } catch (e) {
        if (e.response && e.response.data && e.response.status === 401) {
          this.message = e.response.data.message;
        }
      }
    }
  }
};
</script>
