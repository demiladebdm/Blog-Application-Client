// import React, { useState, useEffect, Suspense } from "react";
import React, { useState, useEffect, lazy, Suspense } from "react";

// import bgImg from "../../assets/blog.png";
// import bgImg from "../../assets/hero.png";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopupPage, setShowPopupPage] = useState(false);

  // const url = "http://localhost:5000/api";
  // const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, []);

  const handleShowPopupPage = (image) => {
    setSelectedImage(image);
    setShowPopupPage(true);
  };

  const handleClosePopup = () => {
    console.log("Close button clicked!");
    setShowPopup(false);
  };

  const handleClosePopupPage = () => {
    setShowPopupPage(false);
  };

  return (
    <section className="homepage">
      {/* <Suspense fallback={<Loader />}> */}
      {showPopup && (
        <Suspense fallback={<Loader />}>
          <Newsletter
            className="showPopupHomepage"
            showPopup={showPopup}
            handleClosePopup={handleClosePopup}
          />
        </Suspense>
      )}
      <Home />
      <Suspense fallback={<Loader />}>
        <Card showPopupPage={handleShowPopupPage} />
        <HomeBlog />
      </Suspense>
      {/* </Suspense> */}

      {showPopupPage && (
        <Suspense fallback={<Loader />}>
          <ECard
            showPopup={showPopupPage}
            handleClosePopup={handleClosePopupPage}
            selectedImage={selectedImage}
          />
        </Suspense>
      )}
    </section>
  );
};

export default HomePage;
