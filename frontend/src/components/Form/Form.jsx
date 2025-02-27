import React, { useState } from "react";
import "./Form.css";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/token";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";

const Form = ({ route, method }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (method === "userRegister" && password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const data = { email, password };
    if (method === "userRegister") {
      data.username = username;
      data.phone = phone;
    }

    try {
      const res = await api.post(route, data);
      if (method === "userLogin") {
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("admin", res.data?.is_superuser);
        dispatch(login(res.data));
        alert("Success");
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.email?.[0] || "Failed to login. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {method === "userLogin" ? (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Login</h2>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="input" placeholder="Email" />
          <label>Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="input" placeholder="Password" />
          <button type="submit" className="submit-button">Login</button>
          <p> Create an account <Link to="/register">Register</Link> </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Register</h2>
          <label>Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" required className="input" placeholder="Username" />
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="input" placeholder="Email" />
          <label>Phone:</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required className="input" placeholder="Phone" />
          <label>Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="input" placeholder="Password" />
          <label>Confirm Password:</label>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required className="input" placeholder="Confirm Password" />
          <button type="submit" className="submit-button">Register</button>
          <p> Already have an account? <Link to="/login">Login</Link> </p>
        </form>
      )}
    </div>
  );
};

export default Form;
