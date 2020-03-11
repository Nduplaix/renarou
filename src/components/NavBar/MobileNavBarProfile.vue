<template>
  <div class="w-100">
    <ul class="navbar-nav" v-if="getUserLogged">
      <li class="nav-item" v-for="(link, index) in userLinks()" :key="index">
        <a type="button" class="nav-link" @click="closeMenu(link)">
          {{ link.label }}
        </a>
      </li>
      <li class="nav-item">
        <a type="button" class="nav-link" @click="$emit('logout')">
          Deconnexion
        </a>
      </li>
    </ul>
    <div class="d-flex justify-content-center flex-column w-100 m-0" v-else>
      <button type="submit" class="col btn btn-outline-primary my-3" @click="$emit('showLogin')">Me connecter</button>
      <button type="submit" class="col btn btn-outline-primary my-3" @click="$emit('showRegister')">M'inscrire</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getUserLogged: { required: true }
  },
  methods: {
    closeMenu(link) {
      this.$emit("closeMenu");
      this.$router.push({ name: link.name });
    }
  }
};
</script>

