import { useEffect, useState } from "react";
import CartItem from "../components/CartItem"
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";

const cardItem = [
  {
    productId: 'a',
    productPhoto: 'https://i.postimg.cc/DfRL0nTy/image.png',
    productName: "THis Is Shooze Ok",
    productPrice: 3000,
    productQuantity: 4,
    productStock: 10
  },
  {
    productId: 'a',
    productPhoto: 'https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg',
    productName: "THis Is Shooze Ok",
    productPrice: 3000,
    productQuantity: 4,
    productStock: 10
  },
  {
    productId: 'a',
    productPhoto: 'https://i.postimg.cc/DfRL0nTy/image.png',
    productName: "THis Is Shooze Ok",
    productPrice: 3000,
    productQuantity: 4,
    productStock: 10
  },
  {
    productId: 'a',
    productPhoto: 'https://i.postimg.cc/DfRL0nTy/image.png',
    productName: "THis Is Shooze Ok",
    productPrice: 3000,
    productQuantity: 4,
    productStock: 10
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

function Cart() {
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
          cardItem.length > 0 ?
            (cardItem.map((i, idx) => (
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