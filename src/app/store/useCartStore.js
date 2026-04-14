import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  cartCount: 0,

  addToCart: (product) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.color === product.color &&
          item.size === product.size,
      );

      let newCart = [...state.cart];

      if (existingItemIndex > -1) {
        newCart[existingItemIndex].quantity += product.quantity;
        
        if (newCart[existingItemIndex].quantity <= 0) {
          newCart.splice(existingItemIndex, 1);
        }
      } else {
        
        newCart.push(product);
      }

      return {
        cart: newCart,
        
        cartCount: newCart.length,
      };
    }),

  removeFromCart: (productId, color, size) => 
    set((state) => {
      const newCart = state.cart.filter(
        (item) => !(item.productId === productId && item.color === color && item.size === size)
      );
      return {
        cart: newCart,
        cartCount: newCart.length, 
      };
    }),

  clearCart: () => set({ cart: [], cartCount: 0 }),
}));