import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table"
import { ReactElement, useState } from "react"
import { Link } from "react-router-dom"

type DataType = {
    _id: string,
    quantity:number,
    discount: number,
    amount: number,
    status: ReactElement,
    action: ReactElement
}

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
]
function Order() {
    const [rows, setRows] = useState<DataType[]>([{
        _id: "1",
        quantity:1,
        discount: 100,
        amount: 100,
        status: <Link to={`/orders/1`}>View</Link>,
        action: <span className="red">
            Processing
        </span>,
    }]);

    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", true)();
    return (
        <div className='container'>
            <h1>My Orders</h1>
            {Table}
        </div>
    )
}

export default Order