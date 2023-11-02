import React, { useState, useEffect, lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./Write.css";
import Loader from "../../components/Loader/Loader";
import httpClient from "../../service/httpClient";
import { useSelector } from "react-redux";
const Editor = lazy(() => import("../../components/Editor/Editor"));

const Write = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [initialCloudinaryUrl, setInitialCloudinaryUrl] = useState("");
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [initialDesc, setInitialDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [initialCategories, setInitialCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fileError, setFileError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descError, setDescError] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userToken = useSelector((state) => state.user.userInfo?.token);

  const arraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

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
   }, [userToken]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (postId) {
          const response = await httpClient(`/posts/${postId}`, userToken);

          if (!response) {
            throw new Error("Failed to fetch post details");
          }

          const formData = await response;
          setTitle(formData.title);
          setDesc(formData.desc);
          setCategories([formData.categories[0].name]);
          setCloudinaryUrl(formData.photo);

          // Set initial values for comparison
          setInitialTitle(formData.title);
          setInitialDesc(formData.desc);
          setInitialCategories(formData.categories);
          setInitialCloudinaryUrl(formData.photo);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        toast.error("Error fetching post details");
      }
    };

    fetchPostDetails();
  }, [postId, userToken]);

  const handleFileChange = async (e) => {
    e.preventDefault();
    setIsImageLoading(true);

    // Track that the user has interacted with the image input
    setIsImageChanged(true);

    const file = e.target.files[0];
    const folderName = "Blog";

    // Clear previous file error
    setFileError("");

    // Validate file
    if (!file) {
      setFileError("Please select a file");
      setIsImageLoading(false);
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
    } finally {
      setIsImageLoading(false);
    }
  };


  // const handleSubmit = async (e) => {
  //   console.log("Hi");
  //   e.preventDefault();

  //   if (isSubmitting) {
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const updatedData = {};

  //      if (isImageChanged) {
  //        // Only update the photo if the user interacted with the image input
  //        updatedData.photo = cloudinaryUrl;
  //      }

  //     if (cloudinaryUrl !== initialCloudinaryUrl) {
  //       updatedData.photo = cloudinaryUrl;
  //     }
  //     if (title !== initialTitle) {
  //       updatedData.title = title;
  //     }
  //     if (desc !== initialDesc) {
  //       updatedData.desc = desc;
  //     }
  //     if (!arraysEqual(categories, initialCategories)) {
  //       updatedData.categories = categories;
  //     }

  //     console.log("updatedData", updatedData);

  //     if (postId) {
  //       const response = await httpClient(`/posts/${postId}`, userToken, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedData),
  //       });

  //       if (!response) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const responseData = await response;
  //       console.log("Post updated:", responseData);
  //       toast.success("Post updated");
  //     } else {
  //       const formData = {
  //         ...(cloudinaryUrl !== initialCloudinaryUrl && {
  //           photo: cloudinaryUrl,
  //         }),
  //         title,
  //         desc,
  //         categories,
  //       };

  //       const response = await httpClient("/posts", userToken, {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (!response) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const responseData = await response;
  //       console.log("Post created:", responseData);

  //       toast.success("Post created");
  //     }

  //     setCloudinaryUrl("");
  //     setTitle("");
  //     setDesc("");
  //     setCategories([]);
  //     setFileError("");
  //     setTitleError("");
  //     setCategoryError("");
  //     setDescError("");

  //     setTimeout(() => {
  //       navigate(`/blog?cat=${categories}`);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error creating/updating post:", error);
  //     toast.error(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleSubmit = async (e, requestUrl, requestBody, method) => {
  //   console.log("Hi", e, requestUrl, requestBody, method);
  //   e.preventDefault();

  //   if (isSubmitting) {
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const response = await httpClient(requestUrl, userToken, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     if (!response) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const responseData = await response;
  //     console.log("Response data:", responseData);
  //     toast.success("Operation successful");

  //     // Reset form fields or perform other actions as needed
  //     setCloudinaryUrl("");
  //     setTitle("");
  //     setDesc("");
  //     setCategories([]);
  //     setFileError("");
  //     setTitleError("");
  //     setCategoryError("");
  //     setDescError("");

  //     setTimeout(() => {
  //       navigate(`/blog?cat=${categories}`);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error processing request:", error);
  //     toast.error(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedData = {};

      console.log("before", updatedData);

      if (isImageChanged) {
        // Only update the photo if the user interacted with the image input
        updatedData.photo = cloudinaryUrl;
      }

      if (postId) {
        // For an update, allow flexibility
        if (cloudinaryUrl !== initialCloudinaryUrl) {
          updatedData.photo = cloudinaryUrl;
        }

        if (title !== initialTitle) {
          updatedData.title = title;
        }
        if (desc !== initialDesc) {
          updatedData.desc = desc;
        }
        if (!arraysEqual(categories, initialCategories)) {
          updatedData.categories = categories;
        }
         console.log("after", updatedData);

        const response = await httpClient(`/posts/${postId}`, userToken, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response;
        console.log("Post updated:", responseData);
        toast.success("Post updated");
      } else {
        // For a new post, enforce certain fields
        if (!cloudinaryUrl || !title || !desc || categories.length === 0) {
          throw new Error("Please fill in all required fields");
        }

        const formData = {
          photo: cloudinaryUrl,
          title,
          desc,
          categories,
        };

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
      }

      // Reset form fields or perform other actions as needed
      setCloudinaryUrl("");
      setTitle("");
      setDesc("");
      setCategories([]);
      setFileError("");
      setTitleError("");
      setCategoryError("");
      setDescError("");

      setTimeout(() => {
        navigate(`/blog?cat=${categories}`);
      }, 1000);
    } catch (error) {
      console.error("Error creating/updating post:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <section className="write">
      <Suspense fallback={<Loader />}>
        <form className="write__form" onSubmit={handleSubmit}>
          {cloudinaryUrl && (
            <section className="uploaded__image">
              {isImageLoading && <Loader />}
              <img
                src={cloudinaryUrl}
                alt="Title"
                onLoad={() => setIsImageLoading(false)}
              />
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
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
              }}
              onChange={handleFileChange}
              // required
            />
            {fileError && <p className="error__message">{fileError}</p>}
            <input
              className="write__title__input"
              type="text"
              placeholder="Title"
              value={title}
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              // required
            />
            {titleError && <p className="error__message">{titleError}</p>}
          </section>

          <section className="write__form__middle">
            <label htmlFor="categories">Choose a category:</label>
            <select
              name="categories"
              id="categories"
              onChange={(e) => setCategories([e.target.value])}
              value={categories.length > 0 ? categories[0] : ""}
              // required
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
                  {/* {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)} */}
                  {capitalize(category.name.replace("-", " "))}
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
            <button type="submit">
              {isSubmitting ? "Publishing..." : postId ? "Update" : "Publish"}
            </button>
          </section>
        </form>
      </Suspense>
    </section>
  );
};

export default Write;
