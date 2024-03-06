
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
    pincode: string
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


export type CountAndChange = {
    revenue: number,
    user: number,
    product: number,
    order: number
}

export type latestTransaction = {
    _id: string,
    discount: number,
    amount: number,
    quantity: number,
    status: string
}

// Stats
export type Stats = {
    categoryCounts: Record<string, number>[],
    percentageChange: CountAndChange,
    count: CountAndChange,
    chart: {
        order: [],
        revenue: []
    },
    userRatio: {
        male: number,
        female: number
    },
    latestTransaction: latestTransaction[]
}



export type UsersAgeGroup = {
    teen: number,
    adult: number,
    old: number
}

export type AdminCustomer = {
    admin: number,
    customer: number
}

export type OrderFulfillment = {
    processing: number,
    shipped: number,
    delivered: number
}
export type RevenueDistribution = {
    netMargin: number,
    discount: number,
    productionCost: number,
    burnt: number,
    marketingCost: number
}

// Pie
export type Pie = {
    usersAgeGroup: UsersAgeGroup
    adminCustomer: AdminCustomer,
    orderFulfillment: OrderFulfillment
    revenueDistribution: RevenueDistribution,
    stockAvailability: {
        inStock: number,
        outOfStock: number
    },
    productCategory: Record<string, number>[]
}

export type Bar = {
    users: number[];
    products: number[];
    orders: number[];
}

export type Line = {
    users: number[];
    products: number[];
    discount: number[];
    revenue: number[];
}

