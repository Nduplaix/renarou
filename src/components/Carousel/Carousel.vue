<template>
  <div class="carousel container">
    <div class="img-content">
      <img :src="currentImage.link" :alt="currentImage.alt" />
    </div>
    <image-list class="mt-2" :images="images" @updateImage="updateImage" />
  </div>
</template>

<script>
import ImageList from "./ImageList";

export default {
  components: {
    ImageList,
  },
  data() {
    return {
      currentImage: this.images[0]
    };
  },
  props: {
    images: { type: Array, require: true }
  },
  methods: {
    updateImage(index) {
      this.currentImage = this.images[index];
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
}
</style>
