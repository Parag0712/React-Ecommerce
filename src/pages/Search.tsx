import { useState } from "react";

import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useAllCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { customError } from "../types/api-type";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/Loader";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  // RTK 
  const { data: categoriesResponse, error, isError, isLoading: loadingCategories } = useAllCategoriesQuery("");
  const { data: productsResponse, isError: productsIsError, isLoading: productsIsLoading, error: productError } = useSearchProductsQuery({
    category,
    page,
    price: maxPrice,
    search,
    sort
  })


  const addToCartHandler = () => {

  };

  const isPrevPage = page > 1;
  const isNextPage = page < productsResponse?.totalPage!;

  // For Error
  if (isError) {
    const err = error as customError
    toast.error(err.data.message);
  }

  if (productsIsError) {
    const err = productError as customError;
    toast.error(err.data.message);
  }
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {
              !loadingCategories &&
              categoriesResponse?.categories.map((category) => (
                <option key={category} value={category}>{category.toUpperCase()}</option>
              ))
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}

          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/[^\w\s]/gi, '');
            setSearch(sanitizedValue)
            setPage(1)
          }}
        />


        <div className="search-product-list">

          {productsIsLoading ? (
            <Skeleton length={10} width="80vw"/>
          ) : (
            productsResponse?.product.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                productImg={product.photo}
                productName={product.name}
                productStock={product.stock}
                productPrice={product.price}
                handler={addToCartHandler}
              />
            ))
          )
          }
        </div>

        {productsResponse && productsResponse?.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {productsResponse.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}

        {/* )} */}
      </main>
    </div>
  );
};

export default Search;