<template>
  <router-link
    :to="{
      name: 'product',
      params: { product: slug }
    }"
    class="px-4 py-3"
    :class="isSmall ? 'col-md-2 col-6' : 'col-md-3'"
  >
    <div class="card" :class="{ small: isSmall }">
      <div
        class="image-hover"
        @mouseover="updateDisplayHover(true)"
        @mouseleave="updateDisplayHover(false)"
      >
        <img :src="image.link" :alt="image.alt" class="card-img-top" />
        <div
          class="image-hover_opacity"
          :class="displayHover ? 'fadein' : 'fadeout'"
          v-if="displayHover"
        >
          <router-link
            :to="{
              name: 'product',
              params: { product: slug }
            }"
            class="btn btn-info"
          >
            <i class="fas fa-search"></i> Voir plus
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <span class="h5 card-title">{{ label }}</span>
        <div class="card-text">Prix: {{ price | toCurrency }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    image: { required: true, type: Object },
    label: { required: true, type: String },
    price: { required: true, type: Number },
    discount: { required: true },
    slug: { required: true, type: String },
    createdAt: { required: true },
    isSmall: { required: false }
  },
  data() {
    return {
      displayHover: false
    };
  },
  methods: {
    updateDisplayHover(show) {
      this.displayHover = show;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

a,
a:hover {
  text-decoration: none;
  color: inherit;
}

.card {
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: $wd-border-radius-medium;
  overflow: hidden;

  .image-hover {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 500px;
      width: 100%;
      max-width: 250px;
    }

    &_opacity {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    }
  }

  &.small {
    .image-hover {
      img {
        max-height: 300px;
        max-width: 150px;
      }
    }
  }
}
</style>
