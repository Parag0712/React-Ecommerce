import { FaCartPlus } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { server } from '../redux/store';
import { CartItems } from '../types/types';

type ProductProps = {
    productId: string,
    productName: string,
    productImg: string,
    productStock: number,
    productPrice: number,
    handler: (cartItem: CartItems) => void
}

function ProductCard({
    productId,
    productImg,
    productName,
    productStock,
    productPrice,
    handler
}: ProductProps) {

    return (
        <article className="card" key={productId}>
            <div className="card__img">
                <img src={`${server}/${productImg}`} alt={productName} />
            </div>
            <div className="card__name">
                <p>{productName}</p>
            </div>
            <div className="card__precis">
                <button className="card__icon"><FaHeart /></button>
                <div>
                    <span className="card__preci card__preci--before" style={{ fontSize: "14px" }}>stock: {productStock}</span>
                    <span className="card__preci card__preci--now">₹{productPrice}</span>
                </div>
                <button className="card__icon" onClick={() => handler({
                    productId: productId,
                    photo: productImg,
                    name: productName,
                    price: productPrice,
                    stock: productStock,
                    quantity: 1,
                })}><FaCartPlus /> </button>
            </div>
        </article>
    );
}

export default ProductCard;
