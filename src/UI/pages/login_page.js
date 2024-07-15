import React, { useState } from "react";
import "../styles/login.css";
import ChatGptIcon from "../../chatGptLogo.svg";
import makePostRequest from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
    emailValidation: false,
  };
  const navigate = useNavigate();
  const [data, setData] = useState(initialValues);
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const loginApi = async () => {
    const result = await makePostRequest("/login", {
      email: data.email,
      password: data.password,
    });
    // After receiving the access token from the server
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('user', JSON.stringify(result.user))
    result.status === "success" && navigate("/employee");
  };
  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData,"googleData")
    // const res = await fetch('/api/google-login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     token: googleData.tokenId,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const data = await res.json();
    // setLoginData(data);
    // localStorage.setItem('loginData', JSON.stringify(data));
  };
  const google = () => {
    window.open("http://localhost:3005/google", "_self");
  };

  const LogInFunc = async () => {
    console.log(data.password === data.confirmPassword);
    setData({
      ...data,
      ["emailValidation"]: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        data.email
      )
        ? false
        : true,

    });
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email) && loginApi();
  };
 
  return (
    <div className="loginPageBackground">
      <div className="signinBodyContent">
        <img className="chatGptIcon" src={ChatGptIcon} />
        <div className="WelcomeBackText">Welcome Back</div>
        <input
          onChange={(e) => {
            setData({ ...data, ["email"]: e.target.value });
          }}
          className="inputField"
          placeholder="Email address"
        />
         {data.emailValidation && (
          <div className="validationText">Email is invalid</div>
        )}
        <input
          onChange={(e) => {
            setData({ ...data, ["password"]: e.target.value });
          }}
          className="inputField"
          placeholder="Password"
        />

        <button
          style={{
            background:
              data.email !== "" && data.password !== "" ? "#10a37f" : "grey",
          }}
          onClick={() => {
            data.email !== "" && data.password !== "" &&

            LogInFunc();
          }}
          className="submitButton"
        >
          Submit
        </button>
        <div className="optionLoginText">
          <div className="accountText">Didn't have an account?</div>
          <a href="/signin" className="loginAnchor">
            sign up
          </a>
        </div>
        <div onClick={google}>Continue With Google</div>
      </div>
     
    </div>
  );
}

export default LoginPage;
