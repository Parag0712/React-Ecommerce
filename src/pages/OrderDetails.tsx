import { Navigate, useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../redux/api/orderAPI";
import { Skeleton } from "../components/Loader";

const OrderDetails = () => {
    const params = useParams();

    const { data, isLoading, isError } = useOrderDetailsQuery(params?.id!)
    console.log(data);
    if (isError) return <Navigate to="/orders" />
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Order Details</h1>
            <div className="cart"  >
                {isLoading ? (
                    <Skeleton length={20} width="" />
                ):(
                <aside style={{ margin: "auto" }}>
                    {
                        data?.order.orderItems.map((order)=>(
                            <p>Name: {order.name}</p>
                        ))
                    }
                    <p>Subtotal: {data?.order.subtotal}</p>
                    <p>Shipping: {data?.order.shippingCharges}</p>
                    <p>Tax: {data?.order.tax}</p>
                    <p>Discount: {data?.order.discount}<em>
                    </em></p>
                    <b>Total: {data?.order.total}</b>
                </aside>
                )

                }
            </div>
        </>
    );
};

export default OrderDetails;