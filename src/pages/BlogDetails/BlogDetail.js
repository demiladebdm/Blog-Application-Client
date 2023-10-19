import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./BlogDetail.css";
import Loader from "../../components/Loader/Loader";

const BlogDetail = () => {
  // const url = "http://localhost:5000/api";
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`${url}/posts/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPost(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostDetails();
  }, [id, url]);

  if (!post) {
    return <Loader />;
  }

  return (
    <section className="single__blogs">
      <Suspense fallback={<Loader />}>
        <section className="single__blog__container">
          <article key={post._id} className="single__blog">
            <Suspense fallback={<Loader />}>
              <section className="single__blog__img">
                <img src={post.photo} alt="Blog" />
              </section>
              <section className="single__blog__details">
                <h3 className="single__blog__title">{post.title}</h3>
                <h4 className="single__blog__category">
                  {post.categories.map((category) => category.name).join(", ")}{" "}
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </h4>
                <p
                  className="single__blog__info"
                  dangerouslySetInnerHTML={{ __html: post.desc }}
                />
                {/* <button>Read more ...</button> */}

                <section>
                  <h2>Share on:</h2>
                </section>
              </section>
            </Suspense>
          </article>
        </section>
      </Suspense>
    </section>
  );
};

export default BlogDetail;
