import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { server, RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { customError } from "../../types/api-type";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/Loader";


interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const arr: Array<DataType> = [
  
];

const Products = () => {


  const { user } = useSelector((state: RootState) => state.userReducer)

  const { data, isError, error,isLoading } = useAllProductsQuery(user?._id!)

  const [rows, setRows] = useState<DataType[]>(arr);
  useEffect(() => {
    if (data) setRows(data?.product.map((value) => ({
      photo: <img src={`${server}/${value.photo}`} />,
      name: value.name,
      price: value.price,
      stock: value.stock,
      action: <Link to={`/admin/product/${value._id}`}>Manage</Link>
    }))
    )
  }, [data])
  if (isError) toast.error((error as customError).data.message)
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      {
        isLoading ? (
          <>
          <Skeleton length={20}/>
          </>
        ):(<main>{Table}</main>)
      }
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
