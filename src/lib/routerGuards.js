import store from "../stores/store";

async function handleRouteChange(to, from, next) {
  await store.dispatch("getCategories");
  if (to.name === "subcategories") {
    await store.dispatch("fetchSubCategory", to.params);
  } else if (to.name === "categories") {
    await store.dispatch("fetchCategory", to.params);
  } else if (to.name === "product") {
    await store.dispatch("fetchCurrentProduct", to.params);
  } else if (to.name === "home") {
    await store.dispatch("fetchNewProducts");
    await store.dispatch("fetchDiscountedProducts");
    await store.dispatch("fetchBanners");
  }

  next();
}

function routerGuard(to, from, next) {
  handleRouteChange(to, from, next);
}

export { routerGuard as beforeRouteUpdate, routerGuard as beforeRouteEnter };
