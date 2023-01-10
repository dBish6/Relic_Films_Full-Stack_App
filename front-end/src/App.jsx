/*  
   Author: David Bishop
   Creation Date: October 1, 2022
*/

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./index.css";

// *Custom Hooks*
import useChangeTitle from "./hooks/useChangeTitle";

// *Components*
import Navigation from "./components/partials/Navigation";
import Footer from "./components/partials/Footer";

// *Pages/Views*
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Error404 from "./pages/errors/Error404";
import Error500 from "./pages/errors/Error500";

function App() {
  const ShowFooter = () => (
    <>
      <Navigation />
      {/* Nested routes render out here. */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ShowFooter />}>
            <Route
              path="/user/profile"
              // element={!window.localStorage.getItem("USER_STATUS") ? <Navigate to={<Login />} : <Profile />}
              element={<Profile />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Movie />} />
            <Route path="/error404" element={<Error404 />} />
            <Route path="/error500" element={<Error500 />} />
            {/* <Route path="*" render={() => <Navigate to="/error404" />} /> */}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
