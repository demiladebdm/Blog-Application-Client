import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./HomeBlog.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
// import { authService } from "../../service/authService";
import httpClient from "../../service/httpClient";
// import parseJsonToHtml from "../../utils/parseJsonToHtml";

const HomeBlog = () => {
  const navigate = useNavigate();
  // const url = process.env.REACT_APP_API_URL;
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await httpClient(`/posts${search}`, userToken);

        if (!response) {
          throw new Error("Network response was not ok");
        }

        const data = await response;
        const sortedPosts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Extract the first few posts
        const firstFewPosts = sortedPosts.slice(0, 6);

        setPosts(firstFewPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search, userToken]);

  const handleReadMore = (firstFewPosts) => {
    console.log("route", firstFewPosts)
    navigate(`/blog/${firstFewPosts}`);
  };

  return (
    <section className="home__blogs">
      <Suspense fallback={<Loader />}>
        <section className="home__blog__container">
          {posts.map((firstFewPosts) => (
            <article key={firstFewPosts._id} className="home__blog__home">
              <Suspense fallback={<Loader />}>
                <section className="home__blog__img">
                  <img src={firstFewPosts.photo} alt="Blog" />
                </section>
                <section className="home__blog__details">
                  <h3 className="home__blog__title">{firstFewPosts.title}</h3>
                  <h4 className="home__blog__category">
                    {firstFewPosts.categories
                      ?.map((category) => category.name)
                      .join(", ")}{" "}
                    <span>
                      {new Date(firstFewPosts.createdAt).toDateString()}
                    </span>
                  </h4>
                  <p
                    className="home__blog__info"
                    dangerouslySetInnerHTML={{ __html: firstFewPosts.desc }}
                  />
                  <button onClick={() => handleReadMore(firstFewPosts._id)}>
                    Read more ...
                  </button>
                </section>
              </Suspense>
            </article>
          ))}
        </section>
      </Suspense>
    </section>
  );
};

export default HomeBlog;
