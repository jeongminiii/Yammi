import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

// AsyncStorage에 저장
const saveCart = async (items: CartItem[]) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(items));
  } catch (e) {
    console.error('Cart save error:', e);
  }
};

const cartaction = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += action.payload.quantity;
      else state.items.push(action.payload);
      saveCart(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0)
          state.items = state.items.filter(i => i.id !== action.payload.id);
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state.items);
    },
    clearCart: state => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { setCart, addToCart, updateQuantity, removeFromCart, clearCart } =
  cartaction.actions;
export default cartaction.reducer;
