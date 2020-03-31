<template>
  <div id="app" class="app preload">
    <NavBar @showLogin="updateDisplayLogin" @showRegister="updateDisplayRegister" />
    <router-view @openLogin="updateDisplayLogin" />
    <register
      v-if="showRegister"
      @hideRegister="updateDisplayRegister"
      @openLogin="showLogin = true"
    />
    <login v-if="showLogin" @hideLogin="updateDisplayLogin" @openRegister="showRegister = true" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";
import Register from "./views/Register";
import { mapActions } from "vuex";

export default {
  components: { Login, NavBar, Register },
  async mounted() {
    await this.setStorageToken();
    this.getCategories();
  },
  data() {
    return {
      showLogin: false,
      showRegister: false
    };
  },
  methods: {
    ...mapActions("user", ["setStorageToken"]),
    ...mapActions(["getCategories"]),
    updateDisplayLogin(toShow) {
      this.showLogin = toShow;
    },
    updateDisplayRegister(toShow) {
      this.showRegister = toShow;
    }
  }
};

let app = document.getElementById("app");

app.onload = () => {
  app.classList.remove("preload");
};
</script>
