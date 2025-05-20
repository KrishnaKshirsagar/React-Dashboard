import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../pages/LoginPage";
// Lazy-loaded child pages
const HomePage = lazy(() => import("../pages/HomePage"));
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"));

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
    ],
  },
  {
    path: "/analytics",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: withSuspense(AnalyticsPage),
      },
    ],
  },
];

const AppRoutes: React.FC = () => {
  const routing = useRoutes(routes);
  return routing;
};

export default AppRoutes;
