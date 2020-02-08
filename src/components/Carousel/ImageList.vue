<template>
  <div class="image-list">
    <span class="slide slide--left" @click="slideTo()"><i class="fas fa-angle-left"></i></span>
    <div class="image-list_content" id="image-list">
      <image-list-component
        :id="`image-list-component-${index}`"
        v-for="(image, index) in images"
        :key="index"
        :image-link="image.link"
        :image-alt="image.alt"
        :index="index"
        @updateImage="updateImage"
      />
    </div>
    <span class="slide slide--right" @click="slideTo(true)"><i class="fas fa-angle-right"></i></span>
  </div>
</template>

<script>
import ImageListComponent from "./ImageListComponent";

export default {
  components: {
    ImageListComponent
  },
  props: {
    images: { type: Array, require: true }
  },
  data() {
    return {
      currentIndex: 0,
      maxIndex: this.images.length - 3
    };
  },
  methods: {
    updateImage(index) {
      this.$emit("updateImage", index);
    },
    slideTo(next) {
      const options = {
        container: "#image-list",
        easing: "ease-in",
        force: true,
        cancelable: true,
        x: true,
        y: false
      };

      if (next) {
        if (this.currentIndex >= this.maxIndex) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
      } else {
        if (this.currentIndex === 0) {
          this.currentIndex = this.maxIndex;
        } else {
          this.currentIndex -= 1;
        }
      }

      this.$scrollTo(`#image-list-component-${this.currentIndex}`, 300, options);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.image-list {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .image-list_content {
    width: 100%;
    display: flex;
    align-items: center;
    overflow: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .slide {
    position: absolute;
    height: 30px;
    width: 30px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba($wd-primary, 0.4);
    &--right {
      right: 0;
    }
    &--left {
      left: 0;
    }
    &:hover {
      background-color: rgba($wd-primary, 0.8);
    }
  }
}
</style>
