import React, { lazy } from "react";
// import React, { Suspense, lazy } from "react";

import { useRoutes } from "react-router-dom";
// import Loader from "../components/Loader";
import Login from "../pages/Auth/LoginPage";
import AuthLayout from "../components/AuthLayout/AuthLayout";
//import Layout from "../components/Layout";
// Lazy-loaded child pages
// const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
// const AuthLayout = lazy(() => import("../components/AuthLayout/AuthLayout"));
const Layout = lazy(() => import("../components/Layout"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Orders = lazy(() => import("../pages/OrderManagement/Orders"));
// const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
//   <Suspense fallback={<Loader />}>
//     <Component />
//   </Suspense>
// );

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/orders",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
    ],
  },
];

const AppRoutes: React.FC = () => {
  const routing = useRoutes(routes);
  return routing;
};

export default AppRoutes;
