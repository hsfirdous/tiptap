import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { ColumnView } from "@/components/editor/nodes/ColumnView";

export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,

  addAttributes() {
    return {
      width: {
        default: 50,
        parseHTML: (element) =>
          parseFloat(element.getAttribute("data-width") || "50"),
        renderHTML: (attributes) => ({
          "data-width": attributes.width,
        }),
      },
      backgroundColor: {
        default: "transparent",
        parseHTML: (element) =>
          element.getAttribute("data-background-color") || "transparent",
        renderHTML: (attributes) => ({
          "data-background-color": attributes.backgroundColor,
        }),
      },
      borderColor: {
        default: "transparent",
        parseHTML: (element) =>
          element.getAttribute("data-border-color") || "transparent",
        renderHTML: (attributes) => ({
          "data-border-color": attributes.borderColor,
        }),
      },
      borderWidth: {
        default: "1px",
        parseHTML: (element) =>
          element.getAttribute("data-border-width") || "1px",
        renderHTML: (attributes) => ({
          "data-border-width": attributes.borderWidth,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column",
        class: "column",
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnView);
  },
});

export default Column;

// import { Node, mergeAttributes } from "@tiptap/core";

// export const Column = Node.create({
//   name: "column",
//   content: "block+",

//   addAttributes() {
//     return {
//       width: {
//         default: "100%",
//         parseHTML: (element) => element.style.width,
//         renderHTML: (attributes) => ({
//           style: `width: ${attributes.width}`,
//         }),
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-type="column"]',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       "div",
//       mergeAttributes(HTMLAttributes, {
//         "data-type": "column",
//         class: "flex-1 min-w-0",
//       }),
//       0,
//     ];
//   },
// });

// export default Column;
