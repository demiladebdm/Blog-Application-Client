import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { authService } from "../../service/authService";

import "./Authentication.css";
import Loader from "../../components/Loader/Loader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(state => state.user)
  const baseUrl = process.env.REACT_APP_API_URL;

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
        // ...authService.setAuthHeader(token),
        body: JSON.stringify(userData),
      });

      console.log("login-data", userData);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the errorData has a 'message' property
        const errorMessage = errorData.message || "An error occurred.";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Login Successful", responseData);

      // Extract the token from the response
      const { token } = responseData;

      // Dispatch action to update user information in Redux store
      dispatch(userActions.setUserInfo(responseData));
      localStorage.setItem("userData", JSON.stringify(responseData));

      // Set the token in the Authorization header for future requests
      const serve = authService.setAuthHeader(token);

      console.log("serve", serve)

      toast.success("User Logged In");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login failed", error.message);
      setError(error.message);
      toast.error(error.message);
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

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  return (
    <section className="login">
      <Suspense fallback={<Loader />}>
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
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="error__message">{error}</p>}
            </form>
          </section>

          <section className="login__bottom">
            <Link to="/register" className="login__link">
              Register Page
            </Link>
          </section>
        </section>
      </Suspense>
    </section>
  );
}

export default Login;
