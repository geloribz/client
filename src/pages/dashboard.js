import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "../components/layout";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      //this will delete item in the local storage
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  // useEffect(() => {
  //   protectedInfo();
  // }, []);
  // this has the dependency array. it is optional here
  // if this has an array, and that array updates, the useEffect will run again

  useEffect(() => {
    protectedInfo();
  });
  // everytime the page is loaded this useEffect will be ran

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>

        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  );
};

export default Dashboard;
