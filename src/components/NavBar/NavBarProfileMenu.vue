<template>
  <ul class="navbar-nav mr-0" v-if="!getUserLogged">
    <li class="nav-item">
      <button
        type="button"
        class="btn btn-outline-primary mr-3"
        @click="$emit('showLogin', true)"
      >
        Me connecter
      </button>
    </li>
    <li class="nav-item">
      <button type="button" class="btn btn-outline-primary" @click="$emit('showRegister')">
        M'inscrire
      </button>
    </li>
  </ul>
  <ul class="navbar-nav mr-0" v-else>
    <li class="nav-item cart">
      <router-link class="nav-link" :to="{ name: 'cart' }">
        <i class="fas fa-shopping-cart cart__icon"></i>
      </router-link>
      <div class="cart__count" v-if="currentUser.basket">{{ cartCount() }}</div>
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="dropdown-user"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Mon compte
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
        <router-link class="dropdown-item" :to="{ name: 'user-profile' }">
          Mon profile
        </router-link>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" type="button" @click="$emit('logout')">
          Deconnexion
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    getUserLogged: { required: true },
    currentUser: { required: true }
  },
  methods: {
    cartCount() {
      let count = 0;
      this.currentUser.basket.basketLines.forEach(function(line) {
        count += line.quantity;
      });

      return count;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
.cart {
  position: relative;
  width: 3rem;
  &__icon {
    font-size: 2rem;
  }
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
</style>
