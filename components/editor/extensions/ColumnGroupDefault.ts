import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ColumnGroupView } from "@/components/editor/nodes/ColumnGroupView"; // আপনার পাথ অনুযায়ী ঠিক করে নিন

export const ColumnGroup = Node.create({
  name: "columnGroup",
  group: "block",
  // "column+" মানে অন্তত একটি কলাম থাকতে হবে।
  // "column column+" দিলে ইউজার চাইলে একটি কলাম মুছতে পারবে না (কমপক্ষে ২টা লাগবে)।
  // সাধারণত "column+" রাখা নিরাপদ।
  content: "column+",

  addAttributes() {
    return {
      layout: {
        default: "two-column",
        parseHTML: (element) => element.getAttribute("data-layout"),
        renderHTML: (attributes) => ({
          "data-layout": attributes.layout,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column-group"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column-group",
        class: "grid gap-4 mb-4", // Static HTML-এর জন্য
      }),
      0,
    ];
  },

  // এই অংশটি মিসিং ছিল, যার কারণে মেনু এবং রিসাইজ হ্যান্ডেল আসছিল না
  addNodeView() {
    return ReactNodeViewRenderer(ColumnGroupView);
  },
});

export default ColumnGroup;

// import { Node, mergeAttributes } from "@tiptap/core";

// export const ColumnGroup = Node.create({
//   name: "columnGroup",
//   group: "block",
//   content: "column column+",

//   addAttributes() {
//     return {
//       layout: {
//         default: "two-column",
//         parseHTML: (element) => element.getAttribute("data-layout"),
//         renderHTML: (attributes) => ({
//           "data-layout": attributes.layout,
//         }),
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-type="column-group"]',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       "div",
//       mergeAttributes(HTMLAttributes, {
//         "data-type": "column-group",
//         class: "grid gap-4 mb-4",
//       }),
//       0,
//     ];
//   },
// });

// export default ColumnGroup;
