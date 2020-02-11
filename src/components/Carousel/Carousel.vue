<template>
  <div class="carousel container">
    <div class="img-content" @click="zoom">
      <img :src="currentImage.link" :alt="currentImage.alt" />
    </div>
    <image-list class="mt-2" :images="images" @updateImage="updateImage" />
    <pop-up v-if="isZoom">
      <img :src="currentImage.link" :alt="currentImage.alt" class="image-zoom" @click="zoom(false)"/>
    </pop-up>
  </div>
</template>

<script>
import ImageList from "./ImageList";
import PopUp from "../PopUp/PopUp";

export default {
  components: {
    ImageList,
    PopUp
  },
  data() {
    return {
      currentImage: this.images[0],
      isZoom: false
    };
  },
  props: {
    images: { type: Array, require: true }
  },
  methods: {
    updateImage(index) {
      this.currentImage = this.images[index];
    },
    zoom(toShow = true) {
      this.isZoom = toShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img-content {
    cursor: zoom-in;
    background-color: white;
    width: 100%;
    max-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 400px;
    }
  }
  .image-zoom {
    cursor: zoom-out;
    max-width: 100%;
    height: 700px;
  }
}
</style>
