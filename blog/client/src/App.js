import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./styles.scss";

const Layout = () => {
  return (<>
    <Navbar />
    <Outlet />
    <Footer />
  </>);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/post/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      },
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const App = () => {
  axios.defaults.baseURL = 'http://localhost:3002/api';
  axios.defaults.withCredentials = true;

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App