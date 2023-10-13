import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Authentication.css";

function Register() {
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:5000/api";
  const baseUrl = "https://blog-application-newapi.vercel.app/api";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistration = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("data", userData);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the errorData has a 'message' property
        const errorMessage = errorData.err || "An error occurred.";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Registration Successful", responseData);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields if needed

    // Call the registration function with the user data
    handleRegistration({
      username: username,
      email: email,
      password: password,
    });
  };

  return (
    <section className="login">
      <section className="login__card">
        <section className="login__title">
          <h1>Register</h1>
        </section>
        <section className="login__content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
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
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p className="error__message">{error}</p>}
          </form>
        </section>

        <section className="login__bottom">
          {/* <p>OR</p> */}
          <Link to="/login" className="login__link">
            Login Page
          </Link>
        </section>
      </section>
    </section>
  );
}

export default Register;
