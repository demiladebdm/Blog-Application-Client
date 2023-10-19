import React from "react";

import "./Footer.css";

const Footer = () => {
  const Logo =
    "https://res.cloudinary.com/dlmd26faz/image/upload/v1697239340/Blog/Static/logo_afxtss.png";

  return (
    <section className="footer">
      <section className="footer__section footer__section__padding">
        <section className="footer__section__links">
          <section className="footer__section__logo">
            <img src={Logo} alt="Footer Logo" />
          </section>
          <section className="footer__section__link__container">
            <section className="footer__section__link">
              <h4>Blog</h4>
              <a href="/employers">
                <p>Academy</p>
              </a>
              <a href="/employers">
                <p>Podcast</p>
              </a>
            </section>
            <section className="footer__section__link">
              <h4>About</h4>
              <a href="/employers">
                <p>Careers</p>
              </a>
              <a href="/employers">
                <p>Sponsorship</p>
              </a>
              <a href="/employers">
                <p>Contact</p>
              </a>
            </section>
            <section className="footer__section__link">
              <h4>Private Policy</h4>
              <a href="/employers">
                <p>Disclaimer</p>
              </a>
              <a href="/employers">
                <p>Scam Alert</p>
              </a>
            </section>
            <section className="footer__section__link">
              <h4>Members Login</h4>
              <a href="/employers">
                <p>Sitemap</p>
              </a>
            </section>
          </section>
        </section>
        <section className="footer__section__bottom">
          <section className="footer__section__bottom__socials">
            <a href="/terms">
              <p>Terms and Conditions</p>
            </a>
            <a href="/terms">
              <p>Privacy</p>
            </a>
            <a href="/terms">
              <p>Terms and Conditions</p>
            </a>
            <a href="/terms">
              <p>Security</p>
            </a>
          </section>
          <section className="footer__section__bottom__category">
            <p>All rights reserved</p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Footer;
