<template>
  <div class="row align-items-center">
    <div class="col text-center" @click="$emit('selectionMenu', true)">
      <i class="fas fa-bars icon"></i>
    </div>
    <div class="col text-center" @click="$emit('selectionMenu', false)">
      <i class="fas fa-user icon"></i>
    </div>
    <div class="col" v-if="basket">
      <div class="cart">
        <a type="button" class="nav-link" @click="redirectToCart">
          <i class="fas fa-shopping-cart icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getUserLogged: { required: true },
    basket: { required: true }
  },
  methods: {
    redirectToCart() {
      this.$emit("closeMenu");
      this.$router.push({ name: "cart" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
.cart {
  position: relative;
}
.icon {
  font-size: 2rem;
}
</style>
