<template>
  <div
    class="validation-popin alert alert-dismissible fade show"
    :class="`alert-${type}`"
    role="alert"
  >
    <p><slot></slot></p>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="$emit('close')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: { required: true, type: String }
  }
};
</script>

<style lang="scss" scoped>
.validation-popin {
  width: 300px;
  position: fixed;
  top: 110px;
  right: 10px;
  z-index: 1000;
}
</style>
