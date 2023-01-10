// *Standard Imports*
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// *Custom Hooks Imports*
import useCount from "../../hooks/useCount";
import usePhoneFormat from "../../hooks/usePhoneFormat";
import useFormLoader from "../../hooks/useFormLoader";

// *API Services Imports*
import FetchMoviePosters from "../../api_services/FetchMoviePosters";

// *Design Imports*
import "./user.css";
import relicFilmsLogo from "../../assets/relic-films-logo-New.webp";
import { MdOutlineArrowBack, MdContactSupport } from "react-icons/md";

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerFavouriteGenre, setRegisterFavouriteGenre] = useState("");
  const [msg, flashMsg] = useState("");
  const [msgString, flashMsgString] = useState("");
  const [msgMinLength, flashMsgMinLength] = useState("");
  const [loading, toggleLoader] = useFormLoader();
  const [poster, loadingContent] = FetchMoviePosters();

  const [count, onCountChange] = useCount();
  const [inputValue, handleInput] = usePhoneFormat();
  const navigate = useNavigate();

  const inputRef = useRef();

  const handlePhoneFlashMsg = (e) => {
    // console.log(e.target.value);
    e.target.value.match(/^[A-Za-z]+$/)
      ? flashMsgString("Must only include numbers.")
      : flashMsgString(null);
  };

  const handlePasswordFlashMsg = () => {
    // console.log(inputRef.current.value);
    inputRef.current.value.length < 6
      ? flashMsgMinLength(`Password must be at least 6 characters.`) &&
        toggleLoader(false)
      : flashMsgMinLength(null) && toggleLoader(false);
  };

  const loaderHelper = () => {
    if (!registerUsername || !registerEmail || !registerPassword) {
      toggleLoader(false);
    }
  };

  const saveRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/api/register",
        data: {
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          phone: registerPhoneNumber,
          favGenre: registerFavouriteGenre,
        },
        withCredentials: true, // So other domains (the back-end) can read cookies.
        validateStatus: (status) => {
          return status === 200 || status === 409; // Resolve only if the status code is 409 or 200; let 409 responses.
        },
      });
      if (res.status === 409) {
        // console.log(res.data);
        flashMsg(res.data.ERROR);
        toggleLoader(false);
      } else {
        // console.log(res.data);
        flashMsg(null);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    /* Left Side */
    <div className="regGridContainer">
      <div className="formBackground">
        <MdOutlineArrowBack
          onClick={() => navigate("/login")}
          className="backArrow"
        />

        <div className="imgContainer">
          <img src={relicFilmsLogo} alt="relic-films-logo-New.webp" />
        </div>

        <form className="formContainer" onSubmit={saveRegister}>
          <h1>Register</h1>
          <div className="formMain">
            {msg ? <small id="takenError">{msg}</small> : null}
            <input
              className={msg ? "inputError" : ""}
              type="text"
              name="username"
              maxLength={28}
              autoComplete="off"
              required
              onChange={(e) => {
                setRegisterUsername(e.target.value);
                onCountChange(e);
              }}
            />
            <label id="usernameLabel" htmlFor="username">
              Unique Username: <span className="required">*</span>
            </label>
            <small id={msg ? "usernameCountIfError" : "usernameCount"}>
              {count}/28
            </small>
          </div>

          <div className="formMain">
            <input
              className={msg ? "inputError" : ""}
              type="email"
              name="email"
              autoComplete="off"
              required
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <label id="emailLabel" htmlFor="email">
              Email: <span className="required">*</span>
            </label>
          </div>

          <div className="formMain">
            <input
              type="password"
              name="password"
              required
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
              ref={inputRef}
              value={registerPassword}
            />
            <label id="passwordLabel" htmlFor="password">
              Password: <span className="required">*</span>
            </label>
            {msgMinLength ? (
              <small id="minLengthError">{msgMinLength}</small>
            ) : null}
          </div>

          <div className="formExtras">
            <div>
              <input
                type="text"
                name="phone"
                autoComplete="off"
                onChange={(e) => {
                  setRegisterPhoneNumber(e.target.value);
                  handleInput(e);
                  handlePhoneFlashMsg(e);
                }}
                placeholder=" "
                value={inputValue}
              />
              <label id="phoneLabel" htmlFor="phone">
                Phone:
              </label>
              {msgString ? (
                <small id="phoneStringError">{msgString}</small>
              ) : null}
            </div>

            <div>
              <input
                type="genre"
                name="genre"
                autoComplete="off"
                onChange={(e) => setRegisterFavouriteGenre(e.target.value)}
                placeholder=" "
              />
              <label id="genreLabel" htmlFor="genre">
                Favorite Genre:
              </label>
            </div>
          </div>

          <div className="registerButtonContainer">
            <button
              className={loading ? "registerButtonCursor" : ""}
              type="submit"
              onClick={() => {
                toggleLoader(true);
                handlePasswordFlashMsg();
                loaderHelper();
              }}
              disabled={loading ? true : false}
            >
              {loading ? <div className="loadingWheel"></div> : "Sign Up"}
            </button>
            <p>
              By clicking on "Sign Up", you agree to the Relic Film's terms and
              privacy policy.
            </p>
          </div>

          <div className="supportTxtContainer">
            <MdContactSupport />
            <p>Contact Support</p>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="welcomeContainer">
        <div className="welcomeBackground">
          <div className="title">
            <h1>The Movie Database</h1>
            <small>Over 44,000+ Movies and Counting</small>
          </div>
          <hr />
          <div className="specialThanks">
            <p>
              Special thanks to Rounak Banik for creating the movie data listed
              on this website. You can find this data set on{" "}
              <a
                href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset?select=movies_metadata.csv"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              , the set was list on www.kaggle.com.
            </p>
          </div>
          {loadingContent ? (
            <p>Loading...</p>
          ) : (
            <div className="welcomeOutline">
              <div className="welcomeCarrousel">
                {poster.map((img, i) => {
                  // console.log(img.poster_path);
                  if (img === undefined || img === null) {
                    return;
                  }
                  return <img key={`stockImage${i}`} src={img.poster_path} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
