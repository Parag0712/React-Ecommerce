const OrderDetails = () => {
    return (
        <>
        <h1 style={{textAlign:"center"}}>Order Details</h1>        
        <div className="cart"  >
                <aside style={{margin:"auto"}}>
                    <p>Subtotal: </p>
                    <p>Shipping: </p>
                    <p>Tax: </p>
                    <p>Discount: <em>
                    </em></p>
                    <b>Total: </b>
                </aside>
            </div>

</>
    );
};

export default OrderDetails;