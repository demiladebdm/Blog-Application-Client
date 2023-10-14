import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./Blog.css";
import Loader from "../../components/Loader/Loader";

const Blog = () => {
  // const url = "http://localhost:5000/api";
  const url = process.env.REACT_APP_API_URL;
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url + "/posts" + search);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPosts(data);
        // console.log("data", data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <section className="blogs">
      <Suspense fallback={<Loader />}>
        <section className="blog__container__title">
          {/* <div>
            <img src={HeaderImg} alt="Header" />
          </div> */}
          <div className="blog__container__background"></div>
          <div>
            <h2 className="blogs__title">Blogs</h2>
            <h4 className="blogs__subtitle">Latest Articles & News</h4>
          </div>
        </section>

        <section className="blog__container">
          {posts.length === 0 ? (
            <p>Sorry, there is no stories yet for this category</p>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="blog">
                <Suspense fallback={<Loader />}>
                  <div className="blog__img">
                    <img src={post.photo} alt="Blog" />
                  </div>
                  <div className="blog__details">
                    <h3 className="blog__title">{post.title}</h3>
                    <h4 className="blog__category">
                      {post.categories}{" "}
                      <span>{new Date(post.createdAt).toDateString()}</span>
                    </h4>
                    <p className="blog__info">{post.desc}</p>
                    <button>Read more ...</button>
                  </div>
                </Suspense>
              </article>
            ))
          )}
        </section>
      </Suspense>
    </section>
  );
};

export default Blog;
