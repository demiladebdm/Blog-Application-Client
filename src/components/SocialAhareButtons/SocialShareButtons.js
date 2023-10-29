import React from "react";

import "./SocialShareButtons.css";

const SocialShareButtons = ({ url, title }) => {
  const socialMediaLinks = [
    { icon: "fab fa-facebook-f", link: "#", class: "social__share__icons" },
    {
      icon: "fab fa-twitter",
      link: "https://x.com/BoyHedger?t=3SC9pKJiu-28TNlOmoVD1Q&s=09",
      class: "social__share__icons",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/wolstreetfinance?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",
      class: "social__share__icons",
    },
    { icon: "fab fa-linkedin-in", link: "#", class: "social__share__icons" },
    {
      icon: "fab fa-telegram",
      link: "https://t.me/wolstreetfinance",
      class: "social__share__icons",
    },
    // {
    //   icon: "fab fa-youtube",
    //   link: "https://www.youtube.com/@WolstreetFinance",
    //   class: "social__share__icons",
    // },
  ];

  return (
    <section className="social__share__buttons">
      {socialMediaLinks.map((socialMedia, index) => (
        <a
          key={index}
          href={socialMedia.link}
          target="_blank"
          rel="noreferrer"
          className={socialMedia.class}
        >
          <i className={socialMedia.icon}></i>
        </a>
      ))}
    </section>
  );
};

export default SocialShareButtons;
