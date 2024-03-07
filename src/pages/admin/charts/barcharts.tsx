import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { getLastMonths } from "../../../utils/features";


const { last12Months: months } = getLastMonths();

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading,isError } = useBarQuery(user?._id!);

  const order = data?.charts.orders || [];
  const products = data?.charts.products || [];
  const users = data?.charts.users || [];  
  
  if (isError) return <Navigate to={"/admin/dashboard"} />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ?
          (<Skeleton length={20} />)
          : (
            <>

              <section>
                <BarChart
                  data_2={users}
                  data_1={products}
                  title_1="Products"
                  title_2="Users"
                  bgColor_1={`hsl(260, 50%, 30%)`}
                  bgColor_2={`hsl(360, 90%, 90%)`}
                />
                <h2>Top Products & Top Customers</h2>
              </section>

              <section>
                <BarChart
                  horizontal={true}
                  data_1={order}
                  data_2={[]}
                  title_1="Orders"
                  title_2=""
                  bgColor_1={`hsl(180, 40%, 50%)`}
                  bgColor_2=""
                  labels={months}
                />
                <h2>Orders throughout the year</h2>
              </section>

            </>)}
      </main>
    </div>
  );
};

export default Barcharts;
