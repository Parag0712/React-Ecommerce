import { FaCartPlus } from 'react-icons/fa';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';

type ProductProps = {
    productId: string,
    productName: string,
    productImg: string,
    productStock: number,
    productPrice: string,
    handler?: () => void
}

function ProductCard({
    productId,
    productImg,
    productName,
    productStock,
    productPrice,
    handler
}: ProductProps) {

    // const server = imgLink
    return (
        <article className="card" key={productId}>
            <div className="card__img">
                <img src={productImg} alt={productName} />
                {/* <img src={`${server}/${productImg}`} alt={productName} /> */}
            </div>
            <div className="card__name">
                <p>{productName}</p>
            </div>
            <div className="card__precis">
                <button  className="card__icon"><FaHeart /></button>
                <div>
                    <span className="card__preci card__preci--before" style={{ fontSize: "14px" }}>stock: {productStock}</span>
                    <span className="card__preci card__preci--now">{productPrice}</span>
                </div>
                <button  className="card__icon"  onClick={handler}><FaCartPlus /> </button>
            </div>
        </article>
    );
}

export default ProductCard;