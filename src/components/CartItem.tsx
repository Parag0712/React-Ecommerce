import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItems } from "../types/types";
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

  const { name:productName, productId:productId, photo:productPhoto, price:productPrice } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${productPhoto}`} alt={productName} />
      <article>
        <Link to={`/product/${productId}`}>{productName}</Link>
        <span>₹{productPrice}</span>
      </article>
      <span>Available Stock:{cartItem.stock - cartItem.quantity}</span>

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