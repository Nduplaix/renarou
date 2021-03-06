import {productsApi} from "../../lib/apis";

function updateBasket(basket) {
  let price = 0;
  let totalDiscount = 0;
  let productCount = basket.basketLines.length;

  basket.basketLines.forEach(elem => {
    elem.totalPrice = elem.reference.product.price * elem.quantity;
    price += elem.totalPrice;
    totalDiscount += elem.reference.product.discount
      ? elem.totalPrice - (elem.totalPrice * elem.reference.product.discount) / 100
      : 0;
    elem.totalWithDiscount = elem.totalPrice - totalDiscount;
  });

  basket.price = price;
  basket.productCount = productCount;
  basket.totalDiscount = totalDiscount;
  basket.totalWithDiscount = price - totalDiscount;
}

function initBasketLine(basketLine) {
  let totalPrice = basketLine.reference.product.price * basketLine.quantity;
  let totalWithDiscount = basketLine.reference.product.discount
    ? totalPrice - (totalPrice * basketLine.reference.product.discount) / 100
    : totalPrice;

  basketLine.totalPrice = totalPrice;
  basketLine.totalWithDiscount = totalWithDiscount;
}

const state = {
  basket: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {
        basketLines: [],
        price: 0,
        productCount: 0,
        totalDiscount: 0,
        totalWithDiscount: 0
      },
  discountCode: null
};

const getters = {
  getBasket: state => state.basket,
  discountCode: state => state.discountCode
};

const mutations = {
  setBasket(state, response) {
    updateBasket();
    state.basket = response;
    localStorage.setItem("cart", state.basket);
  },
  addCartLine(state, line) {
    let toAdd = true;
    initBasketLine(line);
    state.basket.basketLines.forEach(elem => {
      if (line.reference.id === elem.reference.id) {
        elem.quantity += line.quantity;
        if (elem.quantity > elem.reference.stock) {
          elem.quantity = elem.reference.stock;
        }
        toAdd = false;
      }
    });

    if (toAdd) {
      state.basket.basketLines.push(line);
    }

    updateBasket(state.basket);
    localStorage.setItem("cart", JSON.stringify(state.basket));
  },
  removeCartLine(state, index) {
    state.basket.basketLines.splice(index, 1);
    updateBasket(state.basket);
    localStorage.setItem("cart", JSON.stringify(state.basket));
  },
  updateCartLineQuantity(state, { index, quantity }) {
    state.basket.basketLines[index].quantity = quantity;
    updateBasket(state.basket);
    localStorage.setItem("cart", JSON.stringify(state.basket));
  },
  setDiscountCode(state, response) {
    state.discountCode = response.data;
  }
};

const actions = {
  addCartLine({ commit }, { reference, quantity, product }) {
    reference.product = {
      label: product.label,
      price: product.price,
      discount: product.discount,
      images: product.images
    };
    commit("addCartLine", { reference, quantity });
  },
  removeCartLine({ commit }, { index }) {
    commit("removeCartLine", index);
  },
  updateCartQuantity({ commit }, { index, quantity }) {
    commit("updateCartLineQuantity", { index, quantity });
  },
  async fetchDiscountCode({ commit }, { code }) {
    commit("setDiscountCode", await productsApi.post("/submit-discount", { code }));
  },
  cancelDiscountCode({ commit }) {
    commit("setDiscountCode", { data: null });
  }
};

export default { namespaced: true, actions, state, mutations, getters };
