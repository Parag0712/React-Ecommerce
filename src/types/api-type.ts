import { Product, User } from "./types";

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type UserResponse = {
    success: boolean;
    user: User;
};

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

export type ProductResponse = {
    success: boolean;
    product: Product;
    message: string;
};

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


