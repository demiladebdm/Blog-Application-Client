import React, { useState, useEffect, lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./Write.css";
import Loader from "../../components/Loader/Loader";
import httpClient from "../../service/httpClient";
import { useSelector } from "react-redux";
const Editor = lazy(() => import("../../components/Editor/Editor"));

const Write = () => {
  const navigate = useNavigate();
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fileError, setFileError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descError, setDescError] = useState("");
  //   const { user } = useContext(Context);

  // Access the user's token from the Redux store
  const userToken = useSelector((state) => state.user.userInfo?.token);

  // const url = "http://localhost:5000/api";
  const url = process.env.REACT_APP_API_URL;
  const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpClient("/categories", userToken);
        if (!response) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response;
        setCategoryOptions(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const folderName = "Blog";

    // Clear previous file error
    setFileError("");

    // Validate file
    if (!file) {
      setFileError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");
    formData.append("folder", folderName);

    const cloudinaryUploadUrl = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

    if (!cloudinaryUploadUrl) {
      toast.error("Cloudinary upload URL is not defined.");
      return;
    }

    try {
      const cloudinaryResponse = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryData = await cloudinaryResponse.json();
      setCloudinaryUrl(cloudinaryData.secure_url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error(error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setTitleError("");
    setCategoryError("");
    setFileError("");
    setDescError("");

    // Validate title
    if (!title) {
      setTitleError("Please enter a title");
    }

    // Validate category
    if (categories.length === 0) {
      setCategoryError("Please select a category");
    }

    // Validate description
    if (!desc) {
      setDescError("Please enter a description");
    }

    // Check if there are any validation errors
    if (titleError || categoryError || fileError || descError) {
      return;
    }

    const formData = {
      photo: cloudinaryUrl,
      title: title,
      desc: desc,
      categories: categories,
    };

    try {
      const response = await httpClient("/posts", userToken, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response;
      console.log("Post created:", responseData);

      toast.success("Post created");
      setTimeout(() => {
        navigate(`/blog?cat=${categories}`);
      }, 1000);
    } catch (error) {
      console.error("Error creating post:", error);
      console.error("Error creating post message:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="write">
      <Suspense fallback={<Loader />}>
        <form className="write__form" onSubmit={handleSubmit}>
          {cloudinaryUrl && (
            <section className="uploaded__image">
              <img src={cloudinaryUrl} alt="Title Image" />
            </section>
          )}
          <section className="write__form__head">
            <span>Image</span>
            <label htmlFor="file__input">
              <i className="write__icon fas fa-plus"></i>
            </label>

            <input
              type="file"
              id="file__input"
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
            />
            {fileError && <p className="error__message">{fileError}</p>}
            <input
              className="write__title__input"
              type="text"
              placeholder="Title"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {titleError && <p className="error__message">{titleError}</p>}
          </section>

          <section className="write__form__middle">
            <label htmlFor="categories">Choose a category:</label>
            <select
              name="categories"
              id="categories"
              onChange={(e) => setCategories([e.target.value])}
              // value={categories}
              value={categories.length > 0 ? categories[0] : ""}
              required
            >
              <option value="" disabled style={{ color: "red" }}>
                Select a category
              </option>
              {categoryOptions.map((category) => (
                <option
                  key={category._id}
                  value={category.name}
                  className="catValue"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </option>
              ))}
            </select>
            {categoryError && <p className="error__message">{categoryError}</p>}
          </section>

          <section className="write__form__bottom">
            <Suspense fallback={<Loader />}>
              <Editor value={desc} onChange={setDesc} />
            </Suspense>
            {descError && <p className="desc__error__message">{descError}</p>}
          </section>

          <section className="write__form__button">
            <button type="submit" onClick={handleSubmit}>
              Publish
            </button>
          </section>
        </form>
      </Suspense>
    </section>
  );
};

export default Write;
