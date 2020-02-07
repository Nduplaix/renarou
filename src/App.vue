<template>
  <div id="app" class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";

export default {
  components: { NavBar }
};
</script>
