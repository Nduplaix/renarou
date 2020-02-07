<template>
  <div class="popin">
    <div class="popin-dialog" :class="{ small }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    small: { type: Boolean, default: false }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/variables";
.popin {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  .popin-dialog {
    display: flex;
    flex-direction: column;
    min-width: $wd-popup-content-width-medium;
    padding: $wd-padding-4 $wd-padding-7;

    &.small {
      width: $wd-popup-content-width-medium;
    }

    .title {
      text-align: center;
      color: $wd-text;
      font-size: $wd-h1-font-size;
    }

    .content {
      text-align: center;
      font-size: $wd-font-size-lg;
      padding: $wd-padding-3 0;
      color: $wd-text;
    }
  }
}
</style>
