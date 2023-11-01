import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";

import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
// import Logo from "../../assets/logo.png";
import "./Navbar.css";
import { logout } from "../../store/actions/user";
import httpClient from "../../service/httpClient";
// import Loader from "../Loader/Loader";

const Navbar = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [categories, setCategories] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  // const url = "http://localhost:5000/api";
  // const url = process.env.REACT_APP_API_URL;
  const Logo =
    "https://res.cloudinary.com/dlmd26faz/image/upload/v1697239340/Blog/Static/logo_afxtss.png";

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const logoutHandler = () => {
    try {
      setLoading(true);

      dispatch(logout());

      toast.success("User Logging Out");
      navigate("/login");
      // setTimeout(() => {
      // }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpClient("/categories", userToken);

        if (!response) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response;

        // Exclude the category named "Brokers"
        const filteredCategories = data.filter(
          (category) => category.name !== "brokers"
        );

        setCategoryOptions(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [userToken]);

  return (
    <nav className="navbar">
      <section className="nav__height"></section>
      {/* <div className="hamburger" onClick={toggleNavbar}>
        {showNavbar ? <FaTimes /> : <FaBars />}
      </div> */}

      <section className="navbar__left">
        <Link to="/">
          <img src={Logo} alt="Blog Logo" />
        </Link>
      </section>

      <section className="navbar__center">
        <ul
          className="navbar__center__links"
          onClick={() => setShowNavbar(false)}
        >
          <li className="navbar__center__link">
            <Link className="navLinks" to="/">
              Home
            </Link>
          </li>
          <li
            className="navbar__center__link"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <span className="navLinks blog__dropdown">
              Blog <FaAngleDown />
              {showDropdown && (
                <section className="dropdown">
                  <ul className="dropdown__lists">
                    {categoryOptions.map((category) => (
                      <li
                        key={category._id}
                        className="dropdown__list"
                        onClick={closeDropdown}
                      >
                        <Link
                          to={`/blog?cat=${category.name}`}
                          className="dropdown__list__link"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </span>
          </li>
          <li className="navbar__center__link">
            <Link className="navLinks" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="navbar__center__link">
            <Link className="navLinks" to="/brokers?cat=brokers">
              Brokers
            </Link>
          </li>
          <li className="navbar__center__link">
            <Link className="navLinks" to="/mesh">
              Mesh
            </Link>
          </li>
          {userState.userInfo ? (
            <>
              <li className="navbar__center__link">
                <Link className="navLinks" to="/write">
                  Write
                </Link>
              </li>
              <button
                type="button"
                disabled={loading}
                className="logout__button"
                onClick={logoutHandler}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              {/* <li className="navbar__center__link">
                <Link className="navLinks" to="/login">
                  Login
                </Link>
              </li>
              <li className="navbar__center__link">
                <Link className="navLinks" to="/register">
                  Register
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </section>

      <section
        className="navbar2__center"
        // style={
        //   showNavbar ? { background: "#1a1a1a" } : { background: "transparent" }
        // }
      >
        <div
          className="hamburger"
          // style={showNavbar ? { right: "1rem" } : { right: "1rem" }}
          onClick={toggleNavbar}
        >
          {showNavbar ? <FaTimes /> : <FaBars />}
        </div>
        {showNavbar && (
          <ul className="navbar2__center__links">
            <li
              className="navbar2__center__link"
              onClick={() => {
                setShowNavbar(false);
                toggleNavbar();
              }}
            >
              <Link className="navLinks" to="/">
                Home
              </Link>
            </li>

            <li className="navbar2__center__link">
              <span
                className="navLinks blog__dropdown"
                onClick={toggleDropdown}
              >
                Blog <FaAngleDown />
              </span>
            </li>
            {showDropdown &&
              categoryOptions.map((category) => (
                <li
                  key={category._id}
                  className="navbar2__center__link dropdown__list"
                  onClick={() => {
                    closeDropdown();
                    setShowNavbar(false);
                    toggleNavbar();
                  }}
                >
                  <Link
                    to={`/blog?cat=${category.name}`}
                    className="dropdown__list__link"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            <li
              className="navbar2__center__link"
              onClick={() => setShowNavbar(false)}
            >
              <Link className="navLinks" to="/contact">
                Contact Us
              </Link>
            </li>
            <li
              className="navbar2__center__link"
              onClick={() => setShowNavbar(false)}
            >
              <Link className="navLinks" to="/brokers?cat=brokers">
                Brokers
              </Link>
            </li>
            <li
              className="navbar2__center__link"
              onClick={() => setShowNavbar(false)}
            >
              <Link className="navLinks" to="/mesh">
                Merch
              </Link>
            </li>
            {userState.userInfo ? (
              <>
                <li
                  className="navbar2__center__link"
                  onClick={() => {
                    setShowNavbar(false);
                    toggleNavbar(); // Close the navbar
                  }}
                >
                  <Link className="navLinks" to="/write">
                    Write
                  </Link>
                </li>
                <button
                  type="button"
                  disabled={loading}
                  className="logout__button"
                  onClick={() => {
                    logoutHandler();
                    toggleNavbar(); // Close the navbar
                  }}
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                {/* <li className="navbar__center__link">
                <Link className="navLinks" to="/login">
                  Login
                </Link>
              </li>
              <li className="navbar__center__link">
                <Link className="navLinks" to="/register">
                  Register
                </Link>
              </li> */}
              </>
            )}
          </ul>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
