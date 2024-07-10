import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import Page404 from "./pages/404";
import DefaultLayout from "./components/Layout/DefaultLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Dashboard from "./pages/Dashboard";

const route = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element:  <Navigate to="/dashboard" />
      },
      {
        path: '/users',
        element:  <Users />
      },
      {
        path: '/dashboard',
        element:  <Dashboard />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element:  <Login />
      },
      {
        path: '/signup',
        element:  <Signup />
      },
    ]
  },
  {
    path: '*',
    element:  <Page404 />
  },
]);

export default route;
