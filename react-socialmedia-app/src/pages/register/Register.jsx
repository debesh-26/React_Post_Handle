import React, { useRef } from "react";
import "./register.css";
import { useNavigate }  from "react-router-dom"
import { axiosInstance } from "../../config";

const Register = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social Media</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Social Media.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="registerInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="registerInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              required
              className="registerInput"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              required
              type="password"
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerRegisterButton" onClick={handleLogin}>
              Already have an account? Log into account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
