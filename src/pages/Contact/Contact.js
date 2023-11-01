import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import httpClient from "../../service/httpClient";

import bgImg from "../../assets/hero.png";

import "./Contact.css";
import Email from "../../assets/email.png";
import Location from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Shape from "../../assets/shape.png";

const Contact = () => {
  const form = useRef();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const Service_ID = process.env.REACT_APP_SERVICE_ID;
  const Message_ID = process.env.REACT_APP_MESSAGE_ID;
  const Public_ID = process.env.REACT_APP_PUBLIC_ID;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(Service_ID, Message_ID, form.current, Public_ID).then(
      (result) => {
        console.log(result.text);
        toast.success("Message sent Successfully");

        // Clear form fields after successful submission
        setFullName("");
        setEmail("");
        setMessage("");
      },
      (error) => {
        console.log(error.text);
        toast.error("Message Failed");
      }
    );
  };

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  const contactInfoData = [
    // { icon: Location, text: "92 Cherry Drive Uniondale, NY 11553" },
    { icon: Email, text: "wolstreetfinance@gmail.com" },
    { icon: Phone, text: "+234 810 159 1413" },
  ];

  const socialMediaLinks = [
    { icon: "fab fa-facebook-f", link: "#" },
    {
      icon: "fab fa-twitter",
      link: "https://x.com/BoyHedger?t=3SC9pKJiu-28TNlOmoVD1Q&s=09",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/wolstreetfinance?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",
    },
    { icon: "fab fa-linkedin-in", link: "#" },
    { icon: "fab fa-telegram", link: "https://t.me/wolstreetfinance" },
    {
      icon: "fab fa-youtube",
      link: "https://www.youtube.com/@WolstreetFinance",
    },
  ];


  return (
    <section className="contact">
      <span className="big-circle"></span>
      <img src={Shape} className="square" alt="" />
      <section className="form">
        <section className="contact-info">
          <section className="background">
            <img src={bgImg} alt="Background" />
          </section>
        </section>

        <section className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form ref={form} onSubmit={sendEmail} autoComplete="off">
            <h3 className="title">Contact us</h3>

            <section className="input-container">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="from_name"
                className="input"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </section>

            <section className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="from_email"
                className="input"
                placeholder="j.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section className="input-container textarea">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                className="input"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </section>

            <input type="submit" value="Send your message" className="btn" />
          </form>
        </section>
      </section>
    </section>
  );
};

export default Contact;
