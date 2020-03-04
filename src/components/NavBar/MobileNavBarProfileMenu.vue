<template>
  <div class="row bg-secondary text-white w-100 m-0">
    <div class="col border-right text-center" @click="$emit('selectionMenu', true)">Catégories</div>
    <div class="col border-left text-center" @click="$emit('selectionMenu', false)">Mon profile</div>
  </div>
</template>

<script>
export default {};
</script>
