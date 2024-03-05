import { Suspense, lazy, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from "./components/Loader.tsx";
import Header from "./components/Header.tsx";
import { Toaster } from "react-hot-toast";
import { auth } from "./Services/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/userReducers.ts";
import { getUser } from "./redux/api/userAPI.ts";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/protected-route.tsx";

// lazy loading when this component use then load without lazy all components load
const Cart = lazy(() => import('./pages/Cart.tsx'));
const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Shipping = lazy(() => import("./pages/Shipping.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Order = lazy(() => import("./pages/Order.tsx"));
const OrderDetails = lazy(() => import("./pages/OrderDetails.tsx"));

// Admin Imports
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));

const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

function App() {
  const { user, loading } = useSelector((state: RootState) => state.userReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        dispatch(userExist(userData.user))
      } else {
        dispatch(userNotExist());
      }
    })
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />
      {/* Suspense mean some component load then show fallback component */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/cart' element={<Cart />}></Route>

          {/* Not logged routes */}
          <Route element={<ProtectedRoute isAuthenticated={user ? false : true} />}>
            <Route path='/login' element={<Login />}></Route>
          </Route>

          {/* Logged route */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path='/orders' element={<Order />}></Route>
            <Route path='/orders/:id' element={<OrderDetails />}></Route>
            <Route path='/shipping' element={<Shipping />}></Route>
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            element={<ProtectedRoute isAuthenticated={true} adminOnly={true}
              admin={user?.role === "admin" ? true : false} />}
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>;

        </Routes>


      </Suspense>
      <Toaster position="bottom-center"></Toaster>
    </Router>
  )
}

export default App