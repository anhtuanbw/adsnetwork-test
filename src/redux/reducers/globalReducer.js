import { GLOBAL } from "../defines";

const initialState = {
  language: "en",
  currency: {
    locales: "us-US",
    currency: "USD",
  },
  category: "clothing",
  keyword: "",
  products: [],
  product: {},
  userId: "",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL.SET_LANGUAGE:
      return {
        ...state,
        language: action.lang,
      };
    case GLOBAL.SET_CURRENCY:
      return {
        ...state,
        currency: {
          locales:
            action.cur === "JPY"
              ? "jp-JP"
              : action.cur === "VND"
              ? "vn-VN"
              : "en-EN",
          currency: action.cur,
        },
      };
    case GLOBAL.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case GLOBAL.SET_SEARCH:
      return {
        ...state,
        keyword: action.keyword,
      };
    case GLOBAL.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case GLOBAL.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case GLOBAL.SET_AB_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default globalReducer;
