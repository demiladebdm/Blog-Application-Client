import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./Editor.css"

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
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
      ["clean"],
      ["code-block"],
    ],
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
      <ReactQuill
        value={value}
        onChange={onChange}
        theme={"snow"}
        modules={modules}
        formats={formats}
        placeholder="Your new post..."
        className="write__input write__text"
      />
    </section>
  );
};

export default Editor;