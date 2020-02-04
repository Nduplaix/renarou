<template>
  <div v-if="previous !== null || next !== null || display">
    <nav class="d-flex justify-content-center" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: previous === null }">
          <span
            class="page-link"
            aria-label="Previous"
            :aria-disabled="previous === null"
            @click="previous ? loadPage(previous) : null"
          >
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li class="page-item" :class="{ active: current === n }" v-for="n in max" :key="n">
          <span class="page-link" @click="loadPage(n)">{{ n }}</span>
        </li>

        <li class="page-item" :class="{ disabled: next === null }">
          <span class="page-link" aria-label="Next" @click="next ? loadPage(next) : null">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
    <button class="btn btn-info" @click="loadPage(1, true)" v-if="!expanded">Afficher tout</button>
    <button class="btn btn-info" @click="loadPage(1, false)" v-if="expanded">Réduire</button>
  </div>
</template>

<script>
export default {
  props: {
    max: { require: true },
    next: { require: true },
    previous: { require: true },
    current: { require: true },
    display: { require: true }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    loadPage(page, all) {
      this.expanded = !this.expanded;
      this.$emit("loadPage", { page, all });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-link,
.page-item {
  cursor: pointer;
}
button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
