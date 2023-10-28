// // import { generateHTML } from "@tiptap/html";
// // import parse from "html-react-parser";
// // import { extensions } from "../constants/tiptapExtensions";

// // const parseJsonToHtml = (json) => {
// // //   return parse(generateHTML(json));
// //   return parse(generateHTML(json, extensions));
// // };

// // export default parseJsonToHtml;

// // utils/parseJsonToHtml.js
// import React from 'react';

// const parseJsonToHtml = (json) => {
//   // Parse the JSON data and create HTML elements
//   const parsedData = JSON.parse(json);

//   // You might need more sophisticated logic based on your JSON structure
//   // This is a simple example assuming the JSON contains an array of paragraphs
//   const paragraphs = parsedData.map((paragraph, index) => (
//     <p key={index}>{paragraph}</p>
//   ));

//   return <>{paragraphs}</>;
// };

// export default parseJsonToHtml;
