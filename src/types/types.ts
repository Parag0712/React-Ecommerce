export type CartItem = {
    productId:string,
    productPhoto:string,
    productName:string,
    productPrice:number,
    productQuantity:number,
    productStock:number
};

export type User = {
    name:string,
    email:string,
    photo:string,
    gender:string,
    dob:string,
    _id:string,
    role:string,
}

export type Product={
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}