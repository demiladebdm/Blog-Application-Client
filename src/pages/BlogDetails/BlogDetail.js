import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import httpClient from "../../service/httpClient";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./BlogDetail.css";
import Loader from "../../components/Loader/Loader";
import SocialShareButtons from "../../components/SocialAhareButtons/SocialShareButtons";

const BlogDetail = () => {
  // const url = "http://localhost:5000/api";
  const url = process.env.REACT_APP_API_URL;
  // const shareUrl = encodeURI(`https://blog-application-blogclient.vercel.app/`);
  const shareUrl = () => window.location.href;
  const shareTitle = encodeURIComponent(
    `How Generative AI Is Creeping Into EV Battery Development`
  );
  const { id } = useParams();
  const navigate = useNavigate();

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  // const { search } = useLocation();
  // const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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

  // Open the delete modal
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Delete post logic
  const handleDelete = async () => {
    try {
      const response = await httpClient(`/posts/${post._id}`, userToken, {
        method: "DELETE",
      });

      if (!response) {
        throw new Error("Network response was not ok");
      }

      toast.success("Post Deleted Successfully");

      // For example, redirect to another page
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.message);
      // Handle the error as needed (show a message, etc.)
    }

    // After successful delete, close the modal
    closeDeleteModal();
  };

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
                {userToken && (
                  <section className="single__blog__action">
                    {/* <Link
                      className="single__blog__action__link"
                      to={`/edit/${post._id}`}
                    >
                      <p>
                        <FaEdit /> Edit
                      </p>
                    </Link> */}
                    <p
                      className="single__blog__action__button"
                      onClick={openDeleteModal}
                    >
                      <FaTrash /> Delete
                    </p>
                  </section>
                )}
                <h4 className="single__blog__category">
                  {post.categories.map((category) => category.name).join(", ")}{" "}
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </h4>
                <p
                  className="single__blog__info"
                  dangerouslySetInnerHTML={{ __html: post.desc }}
                />
                {/* <button>Read more ...</button> */}

                <section className="single__blog__share">
                  <h2>Share on:</h2>
                  <SocialShareButtons url={shareUrl()} title={shareTitle} />
                </section>
              </section>
            </Suspense>
          </article>
          {isDeleteModalOpen && (
            <div className="overlay" onClick={closeDeleteModal}>
              <div className="modal">
                <p>Confirm Delete?</p>
                <button className="modal__cancel" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button className="modal__delete" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </section>
      </Suspense>

      {/* Delete confirmation modal */}
      {/* <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={closeDeleteModal}>Cancel</button>
      </Modal> */}
    </section>
  );
};

export default BlogDetail;
