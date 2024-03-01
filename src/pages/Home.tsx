import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

function Home() {

  const addCartHandler = ()=>{
    console.log("s");
    
  }

  return (
    <div className="home">
      <section>
      </section>
      <h1 className="title-shop">Latest Products
      <Link to={"/search"} className="findmore">More</Link>
      </h1>
      <main className="main bd-grid">
        <ProductCard
          productId=""
          productImg="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/4dBHXR1Z/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/DfRL0nTy/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/DfRL0nTy/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/8PkwdTYd/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/4dBHXR1Z/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/DfRL0nTy/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />
        <ProductCard
          productId=""
          productImg="https://i.postimg.cc/DfRL0nTy/image.png"
          productName="AIR ZOOM PEGASUS"
          productStock={2}
          productPrice="$749.00"
          handler={addCartHandler}
        />

      </main>
    </div>
  )
}

export default Home