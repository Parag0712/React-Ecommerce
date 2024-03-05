import { Bar, CartItems, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type UserResponse = {
    success: boolean;
    user: User;
};


// Product
export type AllProductsResponse = {
    success: boolean;
    product: Product[];
    message: string;
};

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
    message: string
};


export type ProductResponse = {
    success: boolean;
    product: Product;
    message: string;
};

// Order
export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
    message: string
};
export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
};

// State
export type StateResponse = {
    success: boolean;
    stats: Stats,
    message: string
};

// Dashboard
export type PieResponse = {
    success: boolean;
    charts: Pie;
    message: string;
};

export type BarResponse = {
    success: boolean;
    charts: Bar;
    message: string;
};

export type LineResponse = {
    success: boolean;
    charts: Line;
    message: string;
};


// Seac
export type SearchProductsResponse = AllProductsResponse & {
    totalPage: number;
}

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}

export type NewProductRequest = {
    id: string;
    formData: FormData;
};

export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
};
export type DeleteProductRequest = {
    userId: string;
    productId: string;
};

export type NewOrderRequest = {
    shippingInfo: ShippingInfo,
    orderItems: CartItems[]
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
}
export type UpdateOrderRequest = {
    userId: string,
    orderId: string
}