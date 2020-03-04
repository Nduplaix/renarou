<template>
  <div class="w-100">
    <div v-if="getUserLogged">
      <div class="border-bottom border-top" v-for="(link, index) in userLinks()" :key="index">
        <a type="button" @click="closeMenu(link)">
          {{ link.label }}
        </a>
      </div>
      <div class="border-bottom border-top">
        <a type="button" @click="$emit('logout')">
          Deconnexion
        </a>
      </div>
    </div>
    <div class="row w-100 m-0" v-else>
      <button type="submit" class="col btn btn-outline-primary" @click="$emit('showLogin')">Me connecter</button>
      <button type="submit" class="col btn btn-outline-primary" @click="$emit('showRegister')">M'inscrire</button>
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
