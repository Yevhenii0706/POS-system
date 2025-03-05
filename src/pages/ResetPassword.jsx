import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset, resetPass } from "../features/auth/authSlice";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
      // navigate("/dashboard");

  }, [navigate, dispatch]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passData = {
      password,
      confirmPassword,
    };
    dispatch(resetPass(passData));
  };

  return (
    <>
      <div className="auth-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="formInput">
            <label>New password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="formInput">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn-grad">
            Reset Password
          </button>
          <div className="home">
            <a href="/dashboard">Go back dashboard</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
