import { Link } from "react-router-dom"

import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useState } from "react"
const user = {
  _id: "s",
  role: "admin"
}
function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // For User Drop Down 
  const handleUser = () => {
    setIsOpen(prev=> !prev);
  }

  const handleSignOut = ()=>{
    setIsOpen(false); 
    console.log("logout");
  }
  return (
    <nav className="header">
      <Link onClick={()=>setIsOpen(false)} to="/">Home</Link>
      <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {
        user?._id ? (
          <>
            <button onClick={handleUser}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {
                  user.role === "admin" && (
                    <Link onClick={()=>setIsOpen(false)} to={"admin/dashboard"}>Admin</Link>
                  )
                }
                <Link onClick={()=>setIsOpen(false)} to={"/orders"}>Orders</Link>
                <button onClick={()=>{handleSignOut();}}><FaSignOutAlt /> </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )
      }
    </nav>
  )
}

export default Header