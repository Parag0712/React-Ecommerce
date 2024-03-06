import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { customError } from "../../../types/api-type";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const params = useParams()

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isError, error, data } = useProductDetailsQuery(params?.id!);

  const { category, name, photo, price, stock } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };
  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct] = useUpdateProductMutation();

  const navigate = useNavigate();
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();


  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined) {
      formData.set("stock", stockUpdate.toString());
    }
    if (photoFile) formData.set("photo", photoFile)
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({ formData: formData,  userId: user?._id!, productId: params?.id! });
    responseToast(res, navigate, "/admin/product")
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({productId:params?.id!,userId:user?._id!}) 

    responseToast(res, navigate, "/admin/product")
  }


  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setStockUpdate(data.product.stock);
      setPriceUpdate(data.product.price);
      setCategoryUpdate(data.product.category);
    }
  }, [data])


  if(isError) return <Navigate to="/404" />

  if (isError) return <Navigate to={"/404"} />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {data?.product?._id}</strong>
          <img src={`${server}/${photo}`} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{price}</h3>
        </section>
        <article>
          <button onClick={deleteHandler} className="product-delete-btn">
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="text"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\D/g, '');
                  setPriceUpdate(Number(sanitizedValue));
                }}

              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
