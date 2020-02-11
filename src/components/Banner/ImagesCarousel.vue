<template>
  <div id="carouselCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators" v-if="banners.length > 1">
      <li
        data-target="#carouselCaptions"
        v-for="index in banners.length"
        :key="index"
        :data-slide-to="index"
        :class="{ active: index === 0 }"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(image, index) in banners"
        :key="index"
        :class="{ active: index === 0 }"
      >
        <img :src="image.link" class="d-block w-100" alt="image.description" />
        <div class="carousel-caption d-none d-md-block">
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselCaptions"
      role="button"
      data-slide="prev"
      v-if="banners.length > 1"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselCaptions"
      role="button"
      data-slide="next"
      v-if="banners.length > 1"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["banners"])
  }
};
</script>

<style scoped lang="scss">
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
