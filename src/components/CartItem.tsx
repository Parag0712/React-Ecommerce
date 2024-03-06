import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { CartItems } from "../types/types";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";

type CartItemProps = {
  cartItem: CartItems;
  incrementHandler: (cartItem: CartItems) => void;
  decrementHandler: (cartItem: CartItems) => void;
  removeHandler: (id: string) => void;
};


function CartItem({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) {

  const { name:productName, productId:productId, photo:productPhoto, price:productPrice, quantity:productQuantity, stock:productStock } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${productPhoto}`} alt={productName} />
      {/* <img src={`${productPhoto}`} alt={productName} /> */}
      <article>
        <Link to={`/product/${productId}`}>{productName}</Link>
        <span>₹{productPrice}</span>
      </article>
      <span>avalible Stock:{cartItem.stock - cartItem.quantity}</span>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{cartItem.quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;