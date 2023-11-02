import React from "react";

import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const Logo =
    "https://res.cloudinary.com/dlmd26faz/image/upload/v1697239340/Blog/Static/logo_afxtss.png";

  const navigationLinks = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
    { text: "Brokers", link: "/brokers?cat=brokers" },
  ];

  const contactInfoData = [
    // { icon: Location, text: "92 Cherry Drive Uniondale, NY 11553" },
    { icon: "fa fa-envelope", text: "wolstreetfinance@gmail.com" },
    { icon: "fa fa-phone", text: "+234 810 159 1413" },
  ];

  const socialMediaLinks = [
    {
      icon: "fab fa-youtube",
      link: "https://www.youtube.com/@WolstreetFinance",
    },
    { icon: "fab fa-telegram", link: "https://t.me/wolstreetfinance" },
    {
      icon: "fab fa-twitter",
      link: "https://x.com/BoyHedger?t=3SC9pKJiu-28TNlOmoVD1Q&s=09",
    },
    {
      icon: "fab fa-facebook-f",
      link: "https://www.facebook.com/profile.php?id=61552720400660&mibextid=ZbWKwL",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/wolstreetfinance?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",
    },
    // { icon: "fab fa-linkedin-in", link: "#" },
  ];

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Wolstreet<span>Finance</span>
        </h3>
        <p className="footer-links">
          {navigationLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link to={link.link}>{link.text}</Link>
              {index < navigationLinks.length - 1 && " | "}
            </React.Fragment>
          ))}
        </p>
        <p className="footer-company-name">
          Copyright © 2023 <strong>Wolstreet Finance</strong> All rights
          reserved
        </p>
      </div>

      <div className="footer-center">
        {contactInfoData.map((info, index) => (
          <div key={index}>
            <i className={info.icon}></i>
            <p>{info.text}</p>
          </div>
        ))}
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          <strong>Wolstreet Finance</strong> is a platform created for
          struggling traders and finance enthusiasts.
          <br />
          I am an independent forex trader and an Economist acting as the bridge
          between the wall street and the main street.
          <br />
          My job is to break the big wall street talks around trading and the
          global economy into easy bits for you.
        </p>
        <div className="footer-icons">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
