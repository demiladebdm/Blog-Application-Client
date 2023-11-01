import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./Blog.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
// import { authService } from "../../service/authService";
import httpClient from "../../service/httpClient";
// import parseJsonToHtml from "../../utils/parseJsonToHtml";

const Blog = () => {
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
        
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search, userToken]);

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <section className="blogs">
      <Suspense fallback={<Loader />}>
        <section className="blog__container__title">
          {/* <div>
            <img src={HeaderImg} alt="Header" />
          </div> */}
          <section className="blog__container__background"></section>
          <section>
            <h2 className="blogs__title">Blogs</h2>
            <h4 className="blogs__subtitle">Latest Articles & News</h4>
          </section>
        </section>

        <section className="blog__container">
          {posts.length === 0 ? (
            <p>Sorry, there is no stories yet for this category</p>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="blog">
                <Suspense fallback={<Loader />}>
                  <section className="blog__img">
                    <img src={post.photo} alt="Blog" />
                  </section>
                  <section className="blog__details">
                    <h3 className="blog__title">{post.title}</h3>
                    <h4 className="blog__category">
                      {post.categories
                        ?.map((category) => category.name)
                        .join(", ")}{" "}
                      <span>{new Date(post.createdAt).toDateString()}</span>
                    </h4>
                    {/* {console.log("JSON Content:", post.desc)} */}
                    {/* <p className="blog__info">{post.desc}</p> */}
                    <p
                      className="blog__info"
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                    {/* <p className="blog__info">{parseJsonToHtml(post.desc)}</p> */}
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

export default Blog;
