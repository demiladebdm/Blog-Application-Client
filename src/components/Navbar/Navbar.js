import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";

import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
// import Logo from "../../assets/logo.png";
import "./Navbar.css";
import { logout } from "../../store/actions/user";
import httpClient from "../../service/httpClient";

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
  const url = process.env.REACT_APP_API_URL;
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
    dispatch(logout());

    toast.success("User Logging Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpClient("/categories", userToken);

        if (!response) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response;
        setCategoryOptions(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [userToken]);

  return (
    // <nav className={`navbar ${showNavbar ? "show" : ""}`}>
    <nav className={showNavbar ? "hambugger" : "navbar"}>
      <div className="hamburger" onClick={toggleNavbar}>
        {showNavbar ? <FaTimes /> : <FaBars />}
      </div>
      <section className="navbar__left">
        <Link to="/">
          <img src={Logo} alt="Blog Logo" />
        </Link>
      </section>

      <section className="navbar__center">
        <section className="navbar__left__mobile">
          <Link to="/">
            <img src={Logo} alt="Blog Logo" />
          </Link>
        </section>
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
            <Link className="navLinks" to="/brokers">
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
              <li className="navbar__center__link">
                <Link className="navLinks" to="/login">
                  Login
                </Link>
              </li>
              <li className="navbar__center__link">
                <Link className="navLinks" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </section>

      <section className="navbar__right"></section>
    </nav>
  );
};

export default Navbar;
