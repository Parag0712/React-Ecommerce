
export type CartItem = {
    productId: string,
    productPhoto: string,
    productName: string,
    productPrice: number,
    productQuantity: number,
    productStock: number
};

export type User = {
    name: string,
    email: string,
    photo: string,
    gender: string,
    dob: string,
    _id: string,
    role: string,
}

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}

export type ShippingInfo = {
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: number
}

export type CartItems = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

export type OrderItem = Omit<CartItems, "stock"> & { _id: string }


export type Order = {
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};

