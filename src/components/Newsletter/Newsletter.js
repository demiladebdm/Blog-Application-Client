import React, { useState, useEffect } from "react";

import "./Newsletter.css";
import newsImg from "../../assets/newsletter.jpg";
import newsImg2 from "../../assets/newsletter2.jpg";
import newsImg3 from "../../assets/newsletter3.jpg";
import newsImg4 from "../../assets/newsletter4.jpg";

const Newsletter = ({ showPopup, handleClosePopup }) => {
  //   const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const url = "http://localhost:5000/api";
  const url = "https://blog-application-newapi.vercel.app/api";

  //   const handleClosePopup = () => {
  //     setShowPopup(false);
  //   };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if the inputEmail is a valid email address
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    setIsEmailValid(isValidEmail);

    setErrorMessage("");
    // setErrorMessage(isValidEmail ? "" : "Please enter a valid email address.");
  };

  const submitEmail = async () => {
    try {
      if (!isEmailValid) {
        setErrorMessage("Enter a valid email address.");
        return;
      }

      const response = await fetch(url + "/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Email creation successful:", data);

      handleClosePopup();
    } catch (error) {
      console.error("Error creating email:", error);
    }
  };

  return (
    <section className={`popup__overlay ${showPopup ? "show" : ""}`}>
      <div className="close__button">
        <button onClick={handleClosePopup}>X</button>
      </div>

      <section className="popup__overlay__content">
        <section className="top__input">
          <section className="top__input__left">
            <img src={newsImg} />
          </section>
          <section className="top__input__right">
            <h1>Stay Updated!</h1>
            <section className="top__input__right__body">
              <p>
                Join <span>60,000+</span> active subscribers receiving monthly
                updates on:
              </p>

              <ul>
                <li>Forex</li>
                <li>Binary Options</li>
                <li>Economics</li>
                <li>And much more!</li>
              </ul>
            </section>
          </section>
        </section>
        <section className="bottom__input">
          <section className="bottom__input__content">
            <label htmlFor="email">Email Address</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            {/* <button onClick={submitEmail} disabled={!isEmailValid}> */}
            <button onClick={submitEmail} disabled={email.length < 1}>
              Submit
            </button>
          </section>
          <section className="bottom__input__error">
            {errorMessage && <p className="error__message">{errorMessage}</p>}
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
          </section>
        </section>
      </section>
    </section>
  );
};

export default Newsletter;
