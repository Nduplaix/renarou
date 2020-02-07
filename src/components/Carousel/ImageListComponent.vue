<template>
  <div class="img-list-content mx-2" @click="updateImage">
    <img :src="imageLink" :alt="imageAlt" />
  </div>
</template>

<script>
export default {
  props: {
    imageLink: { require: true },
    imageAlt: { require: true },
    index: { require: true }
  },
  methods: {
    updateImage() {
      this.$emit("updateImage", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-list-content {
  height: 100px;
  min-width: 100px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  img {
    max-height: 100px;
    max-width: 100px;
  }
}
</style>
