import React, { useState, useEffect } from "react";

import bgImg from "../../assets/blog.png";
import "./Home.css";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  // const url = "http://localhost:5000/api";
  const url = "https://blog-application-newapi.vercel.app/api";

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className={`home ${showPopup ? "popup-visible" : ""}`}>
      {showPopup && (
        <Newsletter showPopup={showPopup} handleClosePopup={handleClosePopup} />
      )}

      <section className="home__left">
        <span className="hello">Hello,</span>
        <span className="intro__text">
          I'm Wolstreet <br />{" "}
          <span className="intro__name">LEARN. TRADE.</span>{" "}
          <span className="intro__name__span">EARN.</span> <br />
        </span>

        <p className="intro__paragraph">
          I am the founder of Wolstreet Finance. I specialize in studying great
          research from people much more qualified than me. <br /> Then, I apply
          it to the real-world of trading to find out what works and what
          doesn’t.
          <br />
          And finally, share them with people like you, so you can become a
          consistently profitable trader.
        </p>
      </section>

      <section className="home__right">
        <img src={bgImg} alt="Profile" />
      </section>
    </section>
  );
};

export default Home;
