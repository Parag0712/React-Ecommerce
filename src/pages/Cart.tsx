import { useEffect, useState } from "react";
import CartItem from "../components/CartItem"
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

function Cart() {
  
  const {cartItems,discount,loading,shippingInfo,subtotal,tax,total} = useSelector((state:RootState)=>state.cartReducers);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


  useEffect(() => {
    setIsValidCouponCode(true);
    console.log(isValidCouponCode);
  }, [couponCode])


  //incrementHandler
  const incrementHandler = () => {

  }

  // decrementHandler
  const decrementHandler = () => {

  }

  //removeHandler
  const removeHandler = () => {

  }
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