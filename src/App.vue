<template>
  <div id="app" class="app">
    <NavBar @showLogin="updateDisplayLogin" @showRegister="updateDisplayRegister"/>
    <router-view />
    <register v-if="showRegister" @hideRegister="updateDisplayRegister" />
    <login v-if="showLogin" @hideLogin="updateDisplayLogin" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";
import Register from "./views/Register";

export default {
  components: { Login, NavBar, Register },
  data() {
    return {
      showLogin: false,
      showRegister: false
    };
  },
  methods: {
    updateDisplayLogin(toShow) {
      this.showLogin = toShow;
    },
    updateDisplayRegister(toShow) {
      this.showRegister = toShow;
    }
  }
};
</script>
