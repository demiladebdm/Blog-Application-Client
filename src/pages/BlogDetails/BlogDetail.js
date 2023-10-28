import React, { useState, useEffect, Suspense } from "react";
// import { useLocation } from "react-router";
import Modal from "react-modal";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

// import HeaderImg from "../../assets/test_header.jpeg";
// import BlogImg from "../../assets/test_image.jpeg";
import "./BlogDetail.css";
import Loader from "../../components/Loader/Loader";

const BlogDetail = () => {
  // const url = "http://localhost:5000/api";
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

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
    // Add logic here to delete the post
    // ...

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
                <section className="single__blog__action">
                  <Link to={`/edit/${post._id}`}>
                    <p>
                      <FaEdit /> Edit
                    </p>
                  </Link>
                  <p onClick={openDeleteModal}>
                    <FaTrash /> Delete
                  </p>
                </section>
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
          {isDeleteModalOpen && (
            <div className="overlay" onClick={closeDeleteModal}>
              <div className="modal">
                <p>Confirm Delete?</p>
                <button onClick={closeDeleteModal}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
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
