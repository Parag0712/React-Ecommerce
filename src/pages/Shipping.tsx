import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/store";
import { saveShippingInfo } from "../redux/reducers/cartReducers";
import axios from "axios";
import toast from "react-hot-toast";

const Shipping = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems, discount, subtotal, tax, total, shippingCharges } = useSelector((state: RootState) => state.cartReducers);

  if (cartItems.length <= 0) {
    navigate("/")
  }
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  //Change Handler
  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Submit Handler
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(saveShippingInfo(shippingInfo));
      const { data } = await axios.post(`${server}/api/v1/payment/create`, {
        amount: total
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });


      navigate("/pay", {
        state: data.clientSecret
      })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  }

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>

        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pincode"
          value={shippingInfo.pincode}
          onChange={changeHandler}
        />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;