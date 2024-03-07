import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAddOrderMutation } from '../redux/api/orderAPI';
import { resetCart } from '../redux/reducers/cartReducers';
import { RootState } from '../redux/store';
import { NewOrderRequest } from '../types/api-type';
import { responseToast } from '../utils/features';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.userReducer);
    const {
        cartItems,
        discount,
        loading,
        shippingCharges,
        shippingInfo,
        subtotal,
        tax,
        total
    } = useSelector((state: RootState) => state.cartReducers)

    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const [newOrder] = useAddOrderMutation()


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true)

        const orderData: NewOrderRequest = {
            orderItems: cartItems,
            shippingInfo,
            discount,
            shippingCharges,
            subtotal,
            tax,
            user: user?._id!,
            total
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,

            },
            redirect: "if_required"
        })

        if (error) {
            setIsProcessing(false);
            return toast.error(error?.message! || "Something want wrong");
        }

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(orderData);
            dispatch(resetCart());
            responseToast(res, navigate, "/orders");
        }
        setIsProcessing(false);


    }
    return (
        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? "Processing" : "Pay"}
                </button>
            </form>
        </div>
    )
}

const Checkout = () => {
    const location = useLocation();

    const clientSecret: string | undefined = location.state;

    if (!clientSecret) return <Navigate to={"/shipping"} />;

    return (
        <Elements options={{ clientSecret: clientSecret }} stripe={stripePromise} >
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;