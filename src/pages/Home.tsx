import { useRef, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/Loader";
import toast from "react-hot-toast";
import { CartItems } from "../types/types";
import { addToCard } from "../redux/reducers/cartReducers";

function Home() {

  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useLatestProductsQuery("10");

  const dispatch = useDispatch();

  const addCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock == 0) toast.error("out of stock")
    else {
      dispatch(addToCard(cartItem))

      toast.success("Added in Cart")
    }
  }

  if (isError) toast.error("Cannot Fetched The Products")

  const scrollToCard = (direction: "next" | "previous") => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    const cardWidth = mainElement.scrollWidth / mainElement.children.length;
    let newIndex;
    if (direction === "next") {
      newIndex = Math.min(scrollIndex + 1, mainElement.children.length - 1);
    } else {
      newIndex = Math.max(scrollIndex - 1, 0);
    }
    mainElement.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
    setScrollIndex(newIndex);
  };

  return (
    <div className="home">
      <section>
      </section>
      <h1 className="title-shop">Latest Products
        <Link to={"/search"} className="findmore">More</Link>
      </h1>
      <main className="main bd-grid" >
        <div className="main bd-grid" ref={mainRef}>

          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.product.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                productImg={product.photo}
                productName={product.name}
                productStock={product.stock}
                productPrice={product.price}
                handler={addCartHandler}
              />
            ))
          )
          }
        </div>

        <button className="leftBtn" onClick={() => scrollToCard("previous")}><FaCircleArrowLeft /></button>
        <button className="rightBtn" onClick={() => scrollToCard("next")}><FaCircleArrowRight /></button>

      </main>

    </div>
  )
}

export default Home