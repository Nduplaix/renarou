<template>
  <div id="app" class="app">
    <NavBar @showLogin="updateDisplayLogin"/>
    <router-view />
    <login
      v-if="showLogin"
      @hideLogin="updateDisplayLogin"
    />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";

export default {
  components: { Login, NavBar },
  data() {
    return {
      showLogin: false
    };
  },
  methods: {
    updateDisplayLogin(toShow) {
      this.showLogin = toShow;
    }
  }
};
</script>
