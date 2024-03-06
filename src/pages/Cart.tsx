import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { addToCard, calculatePrice, discountApplied, removeFromCard } from "../redux/reducers/cartReducers";
import { RootState, server } from "../redux/store";
import { CartItems } from "../types/types";


function Cart() {

  const { cartItems, discount, subtotal, tax, total, shippingCharges } = useSelector((state: RootState) => state.cartReducers);


  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();


  //incrementHandler
  const incrementHandler = (cartItem: CartItems) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCard({ ...cartItem, quantity: cartItem.quantity + 1 }));
  }

  // decrementHandler
  const decrementHandler = (cartItem: CartItems) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCard({ ...cartItem, quantity: cartItem.quantity - 1 }));
  }

  //removeHandler
  const removeHandler = (productId: string) => {
    dispatch(removeFromCard(productId));
  }

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/coupon/applyDiscount?coupon=${couponCode}`, { cancelToken }).then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice())
      }).catch((e) => {
        dispatch(discountApplied(0));
        dispatch(calculatePrice())

        setIsValidCouponCode(false);
      })
    }, 1000)

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
      cancel();
    }
  }, [couponCode])


  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])
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
        <p>shippingCharges: ₹{shippingCharges}</p>
        <p>Discount: <em>
          - ₹{discount}
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