import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};


function CartItem({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) {
  const { productName, productId, productPhoto, productPrice, productQuantity, productStock } = cartItem;
  const server = "ssa"

  return (
    <div className="cart-item">
      {/* <img src={`${server}/${productPhoto}`} alt={productName} /> */}
      <img src={`${productPhoto}`} alt={productName} />
      <article>
        <Link to={`/product/${productId}`}>{productName}</Link>
        <span>₹{productPrice}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{productQuantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;