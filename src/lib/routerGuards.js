import store from "../store";

async function handleRouteChange(to, from, next) {
  await store.dispatch("getCategories");
  if (to.name === "subcategories") {
    await store.dispatch("fetchSubCategory", to.params);
  } else if (to.name === "categories") {
    await store.dispatch("fetchCategory", to.params);
  } else if (to.name === "product") {
    await store.dispatch("fetchCurrentProduct", to.params);
  }

  next();
}

function routerGuard(to, from, next) {
  handleRouteChange(to, from, next);
}

export { routerGuard as beforeRouteUpdate, routerGuard as beforeRouteEnter };
