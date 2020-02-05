import axios from "axios";

const productsConfig = {
  baseURL: process.env.VUE_APP_API_URL
  // // STORE TOKEN IN LOCAL STORAGE
  // headers: {
  //   Authorization: `Bearer ${process.env.VUE_APP_JWT_TOKEN}`
  // }
};

const instance = axios.create(productsConfig);

export const productsApi = instance;
