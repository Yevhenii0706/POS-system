import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPass } from "../features/auth/authSlice";

const ResetPassword = () => {

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, success, error, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      toast.error("message")
    } else if (success || user) {
    }
  }, [user, success, error, message, navigate, dispatch]);

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
            <Link to="/dashboard">Go back login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
