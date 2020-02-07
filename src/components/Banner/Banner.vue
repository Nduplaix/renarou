<template>
  <div class="banner">
    <img :src="imageLink" :alt="imageAlt" />
  </div>
</template>

<script>
export default {
  props: {
    imageLink: { required: true, type: String },
    imageAlt: { required: false, type: String }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
