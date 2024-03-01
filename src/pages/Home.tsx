import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useRef, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

function Home() {


  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);


  const addCartHandler = () => {
    console.log("s");

  }

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
          <ProductCard
            productId=""
            productImg="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
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