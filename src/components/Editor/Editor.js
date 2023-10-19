import React, { Suspense, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import Loader from "../Loader/Loader";

const CustomToolbar = ({ quillRef }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    const editor = quillRef.current.getEditor();
    const selection = editor.getSelection();

    if (selection) {
      editor.format("color", value);
    }
  };

  return (
    <select className="ql-color" onChange={handleChange}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="orange">Orange</option>
      <option value="purple">Purple</option>
      <option value="black">Black</option>
    </select>
  );
};

const Editor = ({ value, onChange }) => {
  const quillRef = useRef(); // Corrected placement

  const modules = {
    toolbar: {
      container: [
        [
          { header: "1" },
          { header: "2" },
          { header: [3, 4, 5, 6] },
          { font: [] },
        ],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ color: [] }],
        ["clean"],
        ["code-block"],
      ],
      handlers: {
        color: CustomToolbar,
      },
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
  ];

  return (
    <section className="editor">
      <Suspense fallback={<Loader />}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          theme={"snow"}
          modules={modules}
          formats={formats}
          placeholder="Your new post..."
          className="write__input write__text"
        />
      </Suspense>
    </section>
  );
};

export default Editor;
