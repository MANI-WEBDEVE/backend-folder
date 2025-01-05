import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));


const App = () => {
  return (
    <div className="container mx-auto bg-neutral-900 w-full h-full">
      <Suspense fallback={<div className="flex justify-center items-center h-[90vh] w-full"><Loader /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
