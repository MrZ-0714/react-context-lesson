import React, { createContext, useState, useEffect } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
});

const CartProvider = ({ childern }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemsCount] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemCount,
      }}
    >
      {childern}
    </CartContext.Provider>
  );
};

export default CartProvider;
