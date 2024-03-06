import { CartItems, ShippingInfo, User } from "./types"

export type UserReducerInitialState={
    user:User | null,
    loading:boolean
}

export type CartReducerInitialState={
    loading:boolean
    shippingCharges:number
    cartItems:CartItems[],
    subtotal:number,
    tax:number,
    discount:number,    
    total:number
    shippingInfo:ShippingInfo
}
