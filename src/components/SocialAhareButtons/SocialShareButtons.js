import React from "react";

import "./SocialShareButtons.css";

const SocialShareButtons = ({ url, title }) => {
  const socialMediaLinks = [
    {
      icon: "fab fa-facebook-f",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      class: "social__share__icons",
    },
    {
      icon: "fab fa-twitter",
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      class: "social__share__icons",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/wolstreetfinance?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==",
      class: "social__share__icons",
    },
    { icon: "fab fa-linkedin-in", link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, class: "social__share__icons" },
    {
      icon: "fab fa-telegram",
      link: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
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
