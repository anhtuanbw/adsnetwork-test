import { GLOBAL } from "../defines";

export const setGlobalLanguage = (lang) => ({
  type: GLOBAL.SET_LANGUAGE,
  lang,
});

export const setGlobalCurrency = (cur) => ({
  type: GLOBAL.SET_CURRENCY,
  cur,
});

export const setGlobalCategory = (category) => ({
  type: GLOBAL.SET_CATEGORY,
  category,
});

export const setGlobalSearch = (keyword) => ({
  type: GLOBAL.SET_SEARCH,
  keyword,
});

export const setGlobalProducts = (products) => ({
  type: GLOBAL.SET_PRODUCTS,
  products,
});

export const setGlobalProduct = (product) => ({
  type: GLOBAL.SET_PRODUCT,
  product,
});

export const setGlobalABUserId = (userId) => ({
  type: GLOBAL.SET_AB_USER_ID,
  userId,
});
