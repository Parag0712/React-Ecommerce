import { useRef, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/Loader";
import toast from "react-hot-toast";

function Home() {

  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useLatestProductsQuery("10");

  const dispatch = useDispatch();

  const addCartHandler = () => {
    console.log("s");
  }

  if(isError) toast.error("Cannot Fetched The Products")

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
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/4dBHXR1Z/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/DfRL0nTy/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/DfRL0nTy/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/8PkwdTYd/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/4dBHXR1Z/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/DfRL0nTy/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
          <ProductCard
            productId=""
            productImg="https://i.postimg.cc/DfRL0nTy/image.png"
            productName="AIR ZOOM PEGASUS"
            productStock={2}
            productPrice={749.00}
            handler={addCartHandler}
          />
        </div>

        <button className="leftBtn" onClick={() => scrollToCard("previous")}><FaCircleArrowLeft /></button>
        <button className="rightBtn" onClick={() => scrollToCard("next")}><FaCircleArrowRight /></button>

      </main>

    </div>
  )
}

export default Home