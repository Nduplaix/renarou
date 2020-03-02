import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_API_URL
};

const instance = axios.create(config);

export function setJwt(jwt) {
  instance.defaults.headers.common = { Authorization: `Bearer ${jwt}` };
}

export const productsApi = instance;

export function handleApiErrors(e) {
  if (e.response && e.response.data) {
    const { message, errorDescription } = e.response.data;
    if (e.response.status === 401) {
      throw e;
    } else {
      console.error(message || errorDescription);
    }
  } else {
    console.error(e);
  }
}

// Stripe API

const stripeConfig = {
  baseURL: "https://api.stripe.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${process.env.VUE_APP_STRIPE_SECRET}`
  }
};

const stripeInstance = axios.create(stripeConfig);

export const stripeApi = stripeInstance;
