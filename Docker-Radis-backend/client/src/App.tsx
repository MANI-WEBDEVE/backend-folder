import { Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import axios from "axios";
import { userUserStore } from "./store/userSlice";
import toast from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const App = () => {
  const { email } = userUserStore();
  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/auth/user-auth-check",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          userUserStore.getState().setUser(response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    };
    checkAuthenticated();
  }, []);
  return (
    <div className="container mx-auto bg-neutral-900 w-full h-full">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh] w-full">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={email ? <Home /> : <Navigate to="/login" replace={true} />}
          />
          <Route
            path="/register"
            element={!email ? <Register /> : <Navigate to="/" replace={true} />}
          />
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/" replace={true} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
