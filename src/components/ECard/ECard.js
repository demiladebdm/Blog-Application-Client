import React from "react";

import "./ECard.css";
import { FiCheck } from "react-icons/fi";
import EBookImg from "../../assets/newsletter-ebook.jpg";

const ECard = ({ showPopup, handleClosePopup }) => {
  const bookItems = [
    "Reveal the unfiltered truth about trading",
    "Show you the proper mindset pro traders have",
    "Teach you how you can profit in Bull and Bear markets, even in a recession",
    "Expose the sham of market gurus and how you can escape from their sham",
  ];


  return (
    <section className={`ecard ${showPopup ? "show" : ""}`}>
      <div className="close__button">
        <button onClick={handleClosePopup}>X</button>
      </div>
      <section className="ecard__content">
        <section className="ecard__top">
          <section className="ecard__top__image">
            <img src={EBookImg} />
          </section>
        </section>

        <section className="ecard__middle">
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
            <h1>Enter your email below to get instant access</h1>
            <section data-style="clean" className="clean">
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
                    placeholder="Enter your Email Address"
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
              <section className="formkit-powered-by-convertkit-container"></section>
            </section>
          </form>
        </section>

        <section className="ecard__bottom">
          <section className="ecard__bottom__title">This book will:</section>
          <section className="ecard__bottom__list">
            <ul>
              {bookItems.map((item, index) => (
                <li key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="green"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ECard;
