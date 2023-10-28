import React from "react";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

import "./Newsletter.css";
// import httpClient from "../../service/httpClient";
// import newsImg from "../../assets/newsletter.jpg";
// import newsImg2 from "../../assets/newsletter2.jpg";
// import newsImg3 from "../../assets/newsletter3.jpg";
// import newsImg4 from "../../assets/newsletter4.jpg";
import newsImg from "../../assets/newsletter-ebook.jpg";

const Newsletter = ({ showPopup, handleClosePopup }) => {
  // const userState = useSelector((state) => state.user);
  //   const [showPopup, setShowPopup] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [isEmailValid, setIsEmailValid] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // Access the user's token from the Redux store
  // const userToken = useSelector((state) => state.user.userInfo?.token);

  // const url = "http://localhost:5000/api";
  // const url = process.env.REACT_APP_API_URL;
  // const newsImg =
  //   "https://res.cloudinary.com/dlmd26faz/image/upload/v1697239325/Blog/Static/newsletter_ohsnk4.jpg";

  //   const handleClosePopup = () => {
  //     setShowPopup(false);
  //   };

  // const handleEmailChange = (e) => {
  //   const inputEmail = e.target.value;
  //   setEmail(inputEmail);

  //   // Check if the inputEmail is a valid email address
  //   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
  //   setIsEmailValid(isValidEmail);

  //   setErrorMessage("");
  //   // setErrorMessage(isValidEmail ? "" : "Please enter a valid email address.");
  // };

  // const submitEmail = async () => {
  //   try {
  //     if (!isEmailValid) {
  //       setErrorMessage("Enter a valid email address.");
  //       return;
  //     }

  //     const formData = { name, email };

  //     const response = await httpClient("/emails", userToken, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response;
  //     console.log("Email creation successful:", data);

  //     toast.success("Subscribed Successfully");

  //     handleClosePopup();
  //   } catch (error) {
  //     console.error("Error creating email:", error);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <section className={`popup__overlay ${showPopup ? "show" : ""}`}>
      <div className="close__button">
        <button onClick={handleClosePopup}>X</button>
      </div>

      <section className="popup__overlay__content">
        <section className="top__input">
          <section className="top__input__left">
            <img src={newsImg} alt="News" />
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
          {/* <section className="bottom__input__content">
            <p>Enter your Details Below to Subscribe for free</p>
            <section className="bottom__middle__input__content">
              <input type="name" placeholder="Enter you name here..." value={name} onChange={(e) => {setName(e.target.value)}} />
              <input type="email" placeholder="Enter your email here..." value={email} onChange={handleEmailChange} />
            </section>
            <button onClick={submitEmail} disabled={email.length < 1}>
              Submit & Sign Up
            </button>
          </section>
          <section className="bottom__input__error">
            {errorMessage && <p className="error__message">{errorMessage}</p>}
          </section> */}

          <script src="https://f.convertkit.com/ckjs/ck.5.js" />

          <form
            action="https://app.convertkit.com/forms/5770145/subscriptions"
            className="seva-form formkit-form"
            method="post"
            data-sv-form="5770145"
            data-uid="d60b4cdb90"
            data-format="inline"
            data-version="5"
            data-options='{"settings":{"after_subscribe":{"action":"redirect","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
            min-width="400 500 600 700 800"
          >
            <section data-style="clean">
              <ul
                className="formkit-alert formkit-alert-error"
                data-element="errors"
                data-group="alert"
              ></ul>
              <section
                data-element="fields"
                data-stacked="false"
                className="seva-fields formkit-fields"
              >
                <section className="formkit-field">
                  <input
                    className="formkit-input"
                    name="email_address"
                    aria-label="Email Address"
                    placeholder="Email Address"
                    required=""
                    type="email"
                  />
                </section>
                <button
                  data-element="submit"
                  className="formkit-submit formkit-submit"
                >
                  <section className="formkit-spinner">
                    <section></section>
                    <section></section>
                    <section></section>
                  </section>
                  <span>Yes, I Want!</span>
                </button>
              </section>
              <section
                className="formkit-powered-by-convertkit-container"
              >
                {/* <a
                  href="https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"
                  data-element="powered-by"
                  class="formkit-powered-by-convertkit"
                  data-variant="dark"
                  target="_blank"
                  rel="nofollow"
                >
                  Built with ConvertKit
                </a> */}
              </section>
            </section>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Newsletter;
