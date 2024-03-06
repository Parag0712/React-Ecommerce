import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItems } from "../../types/types"
import { ShippingInfo } from "../../types/types"

const initialState: CartReducerInitialState = {
    loading: false,
    subtotal: 0,
    total: 0,
    shippingCharges: 0,
    cartItems: [],
    discount: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    },
    tax: 0
}

export const cartReducers = createSlice({
    name: "cartReducers",
    initialState,
    reducers: {
        addToCard: (state, actions: PayloadAction<CartItems>) => {
            state.loading = true;
            const index = state.cartItems.findIndex(
                (i) => i.productId === actions.payload.productId
            )
            if (index !== -1) state.cartItems[index] = actions.payload;
            else state.cartItems.push(actions.payload);
            state.loading = false;
        },
        removeFromCard: (state, actions: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productId !== actions.payload);
            state.loading = false;
        },
        calculatePrice: (state) => {
            const subTotal = state.cartItems.reduce(
                (total, item) => total + item.price * item.quantity, 0
            )
            state.subtotal = subTotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
        },
        discountApplied: (state, actions: PayloadAction<number>) => {
            state.discount = actions.payload
        },
        saveShippingInfo: (state, actions: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = actions.payload
        },
        resetCart: () => initialState
    }
})

export const {
    addToCard,
    removeFromCard,
    calculatePrice,
    discountApplied,
    saveShippingInfo,
    resetCart
} = cartReducers.actions;
