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
        <div class="cart__count" v-if="basket">{{ cartCount() }}</div>
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
    cartCount() {
      let count = 0;
      this.basket.basketLines.forEach(function(line) {
        count += line.quantity;
      });

      return count;
    },
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

  &__count {
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    width: 20px;
    background-color: $wd-primary;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $wd-white;
    font-size: $wd-font-size-sm;
  }
}
.icon {
  font-size: 2rem;
}
</style>
