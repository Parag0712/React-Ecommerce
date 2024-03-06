import { useEffect, useState } from "react";
import CartItem from "../components/CartItem"
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItems } from "../types/types";
import { addToCard, calculatePrice, removeFromCard } from "../redux/reducers/cartReducers";

const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

function Cart() {

  const { cartItems, discount, loading, shippingInfo, subtotal, tax, total } = useSelector((state: RootState) => state.cartReducers);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsValidCouponCode(true);
    console.log(isValidCouponCode);
  }, [couponCode])


  //incrementHandler
  const incrementHandler = (cartItem: CartItems) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCard({ ...cartItem, quantity: cartItem.quantity + 1 }));
  }

  // decrementHandler
  const decrementHandler = (cartItem: CartItems) => {
    if (cartItem.quantity <= 1)   return;
    dispatch(addToCard({ ...cartItem, quantity: cartItem.quantity - 1 }));
  }

  //removeHandler
  const removeHandler = (productId:string) => {
    dispatch(removeFromCard(productId));
  }


  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ?
            (cartItems.map((i, idx) => (
              <CartItem key={idx} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} />
            ))) : (<h1>No Items Added</h1>)
        }

      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{subtotal}</p>
        <p>Tax: ₹{tax}</p>
        <p>Discount: <em>

          -₹{discount}
        </em></p>
        <b>Total: ₹{total}</b>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => (setCouponCode(e.currentTarget.value))}
          placeholder="coupon code"
        />
        {
          couponCode &&
          (
            isValidCouponCode ?
              (<span className="green">₹{discount} off using the <code>{couponCode}</code></span>) :
              (<span className="red"><VscError /> Invalid Coupon</span>)
          )

        }

        {CartItem.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  )
}

export default Cart