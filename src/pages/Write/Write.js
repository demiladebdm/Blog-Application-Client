import React, { useState, useEffect } from "react";

import "./Write.css";
import Editor from "../../components/Editor/Editor";

const Write = () => {
  const [file, setFile] = useState("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  //   const { user } = useContext(Context);

  // const url = "http://localhost:5000/api";
  const url = "https://blog-application-newapi.vercel.app/api";

  const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(url + "/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("cat", data);
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");
    formData.append("folder", folderName);

    formData.forEach((obj) => {
      console.log("obj", obj);
    });
    console.log("cloud-form", formData);
    console.log("cloud-name", cloudinaryName);

    try {
      const cloudinaryUploadUrl =
        "https://api.cloudinary.com/v1_1/dlmd26faz/image/upload";
      console.log("url", cloudinaryUploadUrl);
      const cloudinaryResponse = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryData = await cloudinaryResponse.json();
      console.log("cloudinaryData", cloudinaryData);
      setCloudinaryUrl(cloudinaryData.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", cloudinaryUrl);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("categories", categories);

    formData.forEach((obj) => {
      console.log("form-data", obj);
    });

    console.log("uuuu", cloudinaryUrl);

    try {
      const response = await fetch(url + "/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Post created:", responseData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <section className="write">
      <form className="write__form" onSubmit={handleSubmit}>
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
          />

          <input
            className="write__title__input"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </section>

        <section className="write__form__middle">
          <label htmlFor="categories">Choose a category:</label>
          <select
            name="categories"
            id="categories"
            onChange={(e) => setCategories(e.target.value)}
            value={categories}
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
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </option>
            ))}
          </select>
        </section>

        <section className="write__form__bottom">
          <Editor value={desc} onChange={setDesc} />
        </section>

        <section className="write__form__button">
          <button type="submit" onClick={handleSubmit}>
            Publish
          </button>
        </section>
      </form>
    </section>
  );
};

export default Write;
