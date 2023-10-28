import React, { useState, useEffect, lazy, Suspense } from "react";

// import bgImg from "../../assets/blog.png";
import bgImg from "../../assets/hero.png";
import "./Home.css";
import Loader from "../../components/Loader/Loader";
import Blog from "../Blog/Blog"
import { Link } from "react-router-dom";

const Newsletter = lazy(() => import("../../components/Newsletter/Newsletter"));

const Home = () => {
  // const bgImg = "https://res.cloudinary.com/dlmd26faz/image/upload/v1697238685/Blog/Static/blog_lihsdd.png";
  const [showPopup, setShowPopup] = useState(false);

  // const url = "http://localhost:5000/api";
  // const url = process.env.REACT_APP_API_URL;

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
      <Suspense fallback={<Loader />}>
        {/* {showPopup && (
          <Suspense fallback={<Loader />}>
            <Newsletter
              showPopup={showPopup}
              handleClosePopup={handleClosePopup}
            />
          </Suspense>
        )} */}

        <section className="home__left">
          <span className="hello">Hello,</span>
          <span className="intro__text">
            I'm Wolstreet <br />{" "}
            <span className="intro__name">LEARN. TRADE.</span>{" "}
            <span className="intro__name__span">EARN.</span> <br />
          </span>

          <p className="intro__paragraph">
            {/* I am the founder of Wolstreet Finance. I specialize in studying great
            research from people much more qualified than me. <br /> Then, I apply
            it to the real-world of trading to find out what works and what
            doesn’t.
            <br />
            And finally, share them with people like you, so you can become a
            consistently profitable trader. */}
            Here’s the deal… I'll be sending you easy to understand trading tips
            and feed you with happenings in the financial market every week
            without miss. You’ll also get my FREE trading e-book which will
            permanently change your approach to trading. So, click below to gain
            full access…
          </p>

          <section className="read__more">
            <Link className="read__more__button" to="/about">Read More ...</Link>
          </section>
        </section>

        <section className="home__right">
          <img src={bgImg} alt="Profile" />
        </section>

        {/* <Blog /> */}
      </Suspense>
    </section>
  );
};

export default Home;
