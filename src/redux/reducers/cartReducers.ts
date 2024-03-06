import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import {CartItems} from "../../types/types"
import { actions } from "react-table";

const initialState:CartReducerInitialState = {
    loading:false,
    subtotal:0,
    total:0,
    shippingCharges:0,
    cartItems:[],
    discount:0,
    shippingInfo:{
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    },
    tax:0
}

export const cartReducers = createSlice({
    name:"cartReducers",
    initialState,
    reducers:{
        addToCard:(state,actions:PayloadAction<CartItems>)=>{
            state.loading =true;
            state.cartItems.push(actions.payload);
            state.loading=false;
        },
        removeFromCard:(state,actions:PayloadAction<string>)=>{
            state.loading =true;
            state.cartItems = state.cartItems.filter((i)=>i.productId !== actions.payload);
            state.loading=false;
        }
    }
})

export const {addToCard,removeFromCard}  = cartReducers.actions;
