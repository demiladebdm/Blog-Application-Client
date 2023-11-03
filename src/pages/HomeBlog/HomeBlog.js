import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "./HomeBlog.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import httpClient from "../../service/httpClient";

const HomeBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
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

        console.log("Sorted Posts:", sortedPosts); // Add this line

        const firstFewPosts = sortedPosts.slice(0, 6);

        setPosts(firstFewPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search, userToken]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <section className="blogs">
      <Suspense fallback={<Loader />}>
        <section className="home__blog__container">
          {posts.length === 0 ? (
            <p>Sorry, there are no stories yet for this category</p>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="hero__blog">
                <Suspense fallback={<Loader />}>
                  <section className="blog__img">
                    <img src={post.photo} alt="Blog" />
                  </section>
                  <section className="blog__details">
                    <h3 className="blog__title">{post.title}</h3>
                    <h4 className="blog__category">
                      {post.categories
                        ?.map((category) =>
                          capitalize(category.name.replace("-", " "))
                        )
                        .join(", ")}{" "}
                      <span>{new Date(post.createdAt).toDateString()}</span>
                    </h4>
                    <p
                      className="blog__info"
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                    <button onClick={() => handleReadMore(post._id)}>
                      Read more ...
                    </button>
                  </section>
                </Suspense>
              </article>
            ))
          )}
        </section>
      </Suspense>
    </section>
  );
};

export default HomeBlog;
