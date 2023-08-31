import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);

  //if isAuth (logged in)
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);

  //if isAuth is not (not logged in)
  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

//we will then take the state value to local storage so that it will still persist upon refreshing the browser

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RestrictedRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
