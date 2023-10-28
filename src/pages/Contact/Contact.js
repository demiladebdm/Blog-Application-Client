import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    fullName: "",
    // lastName: "",
    email: "",
    // phoneNumber: "",
    message: "",
  });

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  const contactInfoData = [
    // { icon: Location, text: "92 Cherry Drive Uniondale, NY 11553" },
    { icon: Email, text: "wolstreetfinance@gmail.com" },
    { icon: Phone, text: "+234 810 159 1413" },
  ];

  const socialMediaLinks = [
    { icon: "fab fa-facebook-f", link: "#" },
    { icon: "fab fa-twitter", link: "https://x.com/BoyHedger?t=3SC9pKJiu-28TNlOmoVD1Q&s=09" },
    { icon: "fab fa-instagram", link: "https://instagram.com/wolstreetfinance?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==" },
    { icon: "fab fa-linkedin-in", link: "#" },
    { icon: "fab fa-telegram", link: "https://t.me/wolstreetfinance" },
    { icon: "fab fa-youtube", link: "https://www.youtube.com/@WolstreetFinance" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (e) => {
    e.target.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    const { value } = e.target;
    const parent = e.target.parentNode;

    if (value === "") {
      parent.classList.remove("focus");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const requiredFields = [
      "fullName",
      // "lastName",
      "email",
      // "phoneNumber",
      "message",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!isFormValid) {
      toast.error("Please fill in all the required fields");
      return;
    }

    // Add your form submission logic here
    console.log("Form submitted:", formData);

    submitEmail();
  };

  const submitEmail = async () => {
    try {
      const response = await httpClient("/contactus", userToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const data = await response;
      console.log("Form submitted successful:", data);

      toast.success("Form submitted Successfully");
    } catch (error) {
      console.error("Error Submitting Form:", error);
      toast.error(error.message);
    }
  };

  return (
    <section className="contact">
      <span className="big-circle"></span>
      <img src={Shape} className="square" alt="" />
      <section className="form">
        <section className="contact-info">
          <section className="background">
            <img src={bgImg} alt="Background" />
          </section>
          {/* <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>
          <section className="info">
            {contactInfoData.map((info, index) => (
              <section key={index} className="information">
                <img src={info.icon} className="icon" alt={info.text} />
                <p>{info.text}</p>
              </section>
            ))}
          </section>

          <section className="social-media">
            <p>Connect with us :</p>
            <section className="social-icons">
              {socialMediaLinks.map((socialMedia, index) => (
                <a
                  key={index}
                  href={socialMedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={socialMedia.icon}></i>
                </a>
              ))}
            </section>
          </section> */}
        </section>

        <section className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="title">Contact us</h3>

            <section className="input-container">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {/* <span>full Name</span> */}
            </section>

            {/* <section className="input-container">
              <input
                type="text"
                name="lastName"
                className="input"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <label htmlFor="lastName">Last Name</label>
              <span>Last Name</span>
            </section> */}

            <section className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="j.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {/* <span>Email</span> */}
            </section>
            {/* 
            <section className="input-container">
              <input
                type="tel"
                name="phoneNumber"
                className="input"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <label htmlFor="phoneNumber">Phone</label>
              <span>Phone</span>
            </section> */}

            <section className="input-container textarea">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                className="input"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
              {/* <span>Message</span> */}
            </section>

            <input type="submit" value="Send your message" className="btn" />
          </form>
        </section>
      </section>
    </section>
  );
};

export default Contact;
