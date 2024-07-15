import React, { useState } from "react";
import "../styles/login.css";
import ChatGptIcon from "../../chatGptLogo.svg";
import makePostRequest from "../../api/postApi";
import { useNavigate, useNavigation } from "react-router-dom";

function SignInPage() {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    emailValidation: false,
    passwordValidation: false,
  };
  const [data, setData] = useState(initialValues);

  const navigate = useNavigate();
  const signinApi = async () => {
    setData({
      ...data,
      ["passwordValidation"]: false,
      ["emailValidation"]: false,
    });
    const result = await makePostRequest("/signin", {
      email: data.email,
      password: data.password,
    });
    result.status === "success" && navigate("/");
  };
  const signInFunc = async () => {
    console.log(data.password === data.confirmPassword)
    setData({
      ...data,
      ["emailValidation"]: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        data.email
      )
        ? false
        : true,
      ["passwordValidation"]:
        data.password === data.confirmPassword ? false : true,
    });
    (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email)
      && data.password === data.confirmPassword)
        && signinApi()
      
  };
  console.log(data)
  return (
    <div className="loginPageBackground">
      <div className="signinBodyContent">
        <img className="chatGptIcon" src={ChatGptIcon} />
        <div className="createAccountText">Create your account</div>
        <div className="bodyText">
          Please note that phone verification is required for signup. Your
          number will only be used to verify your identity for security
          purposes.
        </div>
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
          type="password"
          onChange={(e) => {
            setData({ ...data, ["password"]: e.target.value });
          }}
          className="inputField"
          placeholder="Set Password"
        />
        <input
          type="password"
          onChange={(e) => {
            setData({ ...data, ["confirmPassword"]: e.target.value });
          }}
          className="inputField"
          placeholder="Confirm Password"
        />
        {data.passwordValidation && (
          <div className="validationText">Password not match</div>
        )}

        <button
          className="submitButton"
          style={{
            background:
              data.email !== "" &&
              data.password !== "" &&
              data.confirmPassword !== ""
                ? "#10a37f"
                : "grey",
          }}
          onClick={() => {
            data.email !== "" &&
              data.password !== "" &&
              data.confirmPassword !== "" &&
              signInFunc();
          }}
        >
          Submit
        </button>
        <div className="optionLoginText">
          <div className="accountText">Already have an account?</div>
          <a href="/login" className="loginAnchor">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
