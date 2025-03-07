import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, success, message } = useSelector((state) => state.auth);

  const userDt = useSelector((state) => state.auth);

  console.log(userDt);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (success || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [error, success, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <div className="auth-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "50px" }}>Login</h1>
          <div className="formInput">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="formInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />

          </div>
          <button type="submit" className="btn-grad">
            Log In
          </button>
          <div className="home">
            <a href="/">Go to home page</a>
          </div>
          <div >
            <p style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", textDecoration: "underline", fontSize: "15px", color: "purple" }}>
              Copyright @Alina Kazi
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
