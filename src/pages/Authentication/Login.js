import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Authentication.css";

function Login() {
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:5000/api";
  const baseUrl = "https://blog-application-newapi.vercel.app/api";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("login-data", userData);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the errorData has a 'message' property
        const errorMessage = errorData || "An error occurred.";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Login Successful", responseData);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields if needed

    // Call the registration function with the user data
    handleLogin({
      email: email,
      password: password,
    });
  };

  return (
    <section className="login">
      <section className="login__card">
        <section className="login__title">
          <h1>Login</h1>
        </section>
        <section className="login__content">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            {/* <input type="submit" value="Register" /> */}
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error__message">{error}</p>}
          </form>
        </section>

        <section className="login__bottom">
          {/* <p>OR</p> */}
          <Link to="/register" className="login__link">
            Register Page
          </Link>
        </section>
      </section>
    </section>
  );
}

export default Login;
