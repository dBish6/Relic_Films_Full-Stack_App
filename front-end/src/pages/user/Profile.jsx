import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);
  // const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      let toCancel = false;
      try {
        // This is for to cancel when we leave the page right after we load the page?
        const res = await axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/auth/api/user",
        });
        // Update only if it is false?
        if (!toCancel) {
          setData(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        toCancel = true;
      };
    };
    getUser();
  }, []);

  const logout = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/api/logout",
      });
      // console.log(res);
      // console.log(res.data);

      window.localStorage.removeItem("USER_STATUS");

      navigate("/home");
      window.location.reload();
      alert("Session timed out.");
    } catch (error) {
      console.error(error);
    }
  };

  // Good way; actually don't matter?
  // useEffect(() => {
  //   if (!window.localStorage.getItem("USER_STATUS")) {
  //     navigate("/");
  //   }
  // }, [!window.localStorage.getItem("USER_STATUS")]);

  // Bad way.
  if (!window.localStorage.getItem("USER_STATUS")) {
    navigate("/");
  }

  return (
    <>
      <h1>Welcome {!data ? "false" : data.rows[0].username}</h1>
      <div>
        <a className="logoutLink" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </>
  );
};

export default Profile;
