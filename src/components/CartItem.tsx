import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
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
  const { name:productName, productId:productId, photo:productPhoto, price:productPrice, quantity:productQuantity, stock:productStock } = cartItem;
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