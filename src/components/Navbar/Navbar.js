import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaAngleDown } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  // const url = "http://localhost:5000/api";
  const url = "https://blog-application-newapi.vercel.app/api";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(url + "/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategoryOptions(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <section className="navbar__left">
        <Link to="/">
          <img src={Logo} alt="Blog Logo" />
        </Link>
      </section>

      <section className="navbar__center">
        <ul className="navbar__center__links">
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
          <li className="navbar__center__link">
            <Link className="navLinks" to="/write">
              Write
            </Link>
          </li>
        </ul>
      </section>

      <section className="navbar__right"></section>
    </nav>
  );
};

export default Navbar;
