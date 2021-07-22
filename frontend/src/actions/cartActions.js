import axios from "axios";
import {
  ADD_TO_CART,
  ADD_USER_CART,

  EMPTY_CART,
  GET_USER_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,

} from "../constants/cartConstants";

export const addItemToCart = (slug, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${slug}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      title: data.product.title,
      price: data.product.price,
      image: data.product.images[0].url,
      description: data.product.description,
      slug: data.product.slug,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const userCart = (cart, token) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post("/api/user/cart", { cart }, config);

  dispatch({
    type: ADD_USER_CART,
    payload: data.newCart,
  });
};

export const getUserCart = (token) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get("/api/user/cart", config);
  const { products, cartTotal, totalAfterDiscount } = data;
  dispatch({
    type: GET_USER_CART,
    payload: {
            products,
        cartTotal,
        totalAfterDiscount,
    }
  });
};

// delete can be used 
export const emptyUserCart = (token) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete("/api/user/cart", config);
  // const { products, cartTotal, totalAfterDiscount } = data;
  dispatch({
    type: EMPTY_CART,
    payload: data.cart
  });
};

