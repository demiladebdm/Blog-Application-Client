import React, { useState, useEffect, lazy, Suspense } from "react";

// import bgImg from "../../assets/blog.png";
import bgImg from "../../assets/hero.png";
import "./HomePage.css";
import Loader from "../../components/Loader/Loader";
// import Blog from "../Blog/Blog"

import Home from "../Home/Home";
import HomeBlog from "../HomeBlog/HomeBlog";
import Card from "../../components/Card/Card";
import ECard from "../../components/ECard/ECard";

const Newsletter = lazy(() => import("../../components/Newsletter/Newsletter"));

const HomePage = () => {
  // const bgImg = "https://res.cloudinary.com/dlmd26faz/image/upload/v1697238685/Blog/Static/blog_lihsdd.png";
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupPage, setShowPopupPage] = useState(false);

  // const url = "http://localhost:5000/api";
  // const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, []);

  const handleShowPopupPage = () => {
    setShowPopupPage(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClosePopupPage = () => {
    setShowPopupPage(false);
  };

  return (
    <section className="homepage">
      <Suspense fallback={<Loader />}>
        {/* {showPopup && (
          <Suspense fallback={<Loader />}>
            <Newsletter
              showPopup={showPopup}
              handleClosePopup={handleClosePopup}
            />
          </Suspense>
        )} */}
        <section className="homeAll">
          <Home />
        </section>
        <section className="homeCard">
          <Card showPopupPage={handleShowPopupPage} />
        </section>
        <section className="homeBlog">
          <HomeBlog />
        </section>
      </Suspense>
      
      {showPopupPage && (
        <Suspense fallback={<Loader />}>
          <ECard
            showPopup={showPopupPage}
            handleClosePopup={handleClosePopupPage}
          />
        </Suspense>
      )}
    </section>
  );
};

export default HomePage;
