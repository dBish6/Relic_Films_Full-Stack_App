// *Standard Imports*
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// *Custom Hooks Imports*
import useToggleVisiblity from "../../hooks/useToggleVisiblity";
import useFormLoader from "../../hooks/useFormLoader";

// *Design Imports*
import "./user.css";
import relicFilmsLogo from "../../assets/relic-films-logo-New.webp";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [msg, flashMsg] = useState("");
  const [visible, toggleVisiblity] = useToggleVisiblity();
  const [loading, toggleLoader] = useFormLoader();
  const navigate = useNavigate();

  const loaderHelper = () => {
    if (!loginUsername || !loginPassword) {
      toggleLoader(false);
    }
  };

  const saveLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/api/login",
        data: {
          username: loginUsername,
          password: loginPassword,
        },
        withCredentials: true, // So other domains (the back-end) can read cookies.
        validateStatus: (status) => {
          return status === 200 || status === 404; // Resolve only if the status code is 404 or 200; let 404 responses.
        },
      });
      if (res.status === 404) {
        // console.log(res.data);
        flashMsg(res.data.ERROR);

        // Stops the loading icon from appearing.
        toggleLoader(false);
        // setStopLoading(true);
      } else {
        // console.log(res.data);
        flashMsg(null);

        let USER_STATUS = res.data.loggedIn;
        window.localStorage.setItem("USER_STATUS", USER_STATUS);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      // console.error(error.response.data);
      // navigate("/error500")
    }
  };

  return (
    <>
      <Link to="/home">
        <img src={relicFilmsLogo} alt="relic-films-logo-New.webp" />
      </Link>
      <div className="loginFlexContainer">
        {/* <form className="loginFormContainer" onSubmit={handleSubmit(saveLogin)}> */}
        <form className="loginFormContainer" onSubmit={saveLogin}>
          <div className="loginBox">
            <h1>Welcome</h1>

            {msg ? <small>{msg}</small> : null}
            <div className="inputDiv">
              <input
                className={msg ? "inputError" : ""}
                type="text"
                name="username"
                autoComplete="off"
                required
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <label id="usernameLabel" htmlFor="username">
                Username:<span className="required">*</span>
              </label>
            </div>

            <div className="inputDiv">
              {/* If the user clicks on the eye icon show password and if passwordShow is true set the eyeOff icon. */}
              {visible ? (
                <MdOutlineVisibilityOff
                  onClick={toggleVisiblity}
                  className={msg ? "positionIcon" : ""}
                />
              ) : (
                <MdOutlineVisibility
                  onClick={toggleVisiblity}
                  className={msg ? "positionIcon" : ""}
                />
              )}
              <input
                className={msg ? "inputError" : ""}
                type={visible ? "text" : "password"}
                name="password"
                id="password"
                required
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label id="passwordLabel" htmlFor="password">
                Password:<span className="required">*</span>
              </label>
            </div>
            <div className={"loginButtonContainer"}>
              <button
                className={loading ? "loginButtonCursor" : ""}
                type="submit"
                // id="loginButton"
                onClick={() => {
                  toggleLoader(true);
                  loaderHelper();
                }}
                disabled={loading ? true : false}
              >
                {loading ? <div className="loadingWheel"></div> : "Login"}
              </button>
            </div>
          </div>
        </form>
        <div className="extras">
          <p>Don't have a account?</p>
          <Link to="/register">Sign Up</Link>
        </div>

        <small className="helpTxt">
          <a href="#">Terms</a> | <a href="#">Privacy</a> |{" "}
          <a href="#">Security</a> | <a href="#">Contact Support</a>
        </small>
      </div>
    </>
  );
};

export default Login;
