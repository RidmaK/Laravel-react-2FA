import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import Page404 from "./pages/404";
import DefaultLayout from "./components/Layout/DefaultLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Verify from "./pages/Verify";
import { CreateMultiFactorAuthentication } from "./pages/Verify/CreateMultiFactorAuthentication";

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
      {
        path: '/products',
        element:  <Product />
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
      {
        path: '/verify-user',
        element:  <Verify />
      },
      {
        path: '/mfa',
        element:  <CreateMultiFactorAuthentication />
      },
    ]
  },
  {
    path: '*',
    element:  <Page404 />
  },
]);

export default route;
