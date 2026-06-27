import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ColumnView } from "@/components/editor/nodes/ColumnView";

export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,
  selectable: true,
  defining: true,
  draggable: false,

  addAttributes() {
    return {
      width: {
        default: 50,
        parseHTML: (element) => {
          const widthAttr =
            element.getAttribute("data-width") ||
            element.style.width ||
            element.style.flexBasis;
          if (!widthAttr) return 50;
          const parsed = parseFloat(widthAttr);
          return isNaN(parsed) ? 50 : parsed;
        },
        renderHTML: (attributes) => ({ "data-width": attributes.width }),
      },
      backgroundColor: {
        default: "transparent",
        parseHTML: (element) =>
          element.getAttribute("data-background-color") ||
          element.style.backgroundColor ||
          "transparent",
        renderHTML: (attributes) => ({
          "data-background-color": attributes.backgroundColor,
        }),
      },
      borderColor: {
        default: "transparent",
        parseHTML: (element) =>
          element.getAttribute("data-border-color") ||
          element.style.borderColor ||
          "transparent",
        renderHTML: (attributes) => ({
          "data-border-color": attributes.borderColor,
        }),
      },
      borderWidth: {
        default: "1px",
        parseHTML: (element) =>
          element.getAttribute("data-border-width") ||
          element.style.borderWidth ||
          "1px",
        renderHTML: (attributes) => ({
          "data-border-width": attributes.borderWidth,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }, { tag: "div.column" }];
  },

  renderHTML({ HTMLAttributes }) {
    const rawWidth = HTMLAttributes["data-width"] ?? 50;
    const parsedWidth =
      typeof rawWidth === "number" ? rawWidth : parseFloat(rawWidth);
    const width = !isNaN(parsedWidth) ? parsedWidth : 50;
    const backgroundColor =
      HTMLAttributes["data-background-color"] || "transparent";
    const borderColor = HTMLAttributes["data-border-color"] || "transparent";
    const borderWidth = HTMLAttributes["data-border-width"] || "1px";

    const hexColors: Record<string, string> = {
      white: "#ffffff",
      gray: "#f4f4f5",
      blue: "#eff6ff",
      green: "#f0fdf4",
      yellow: "#fefce8",
      red: "#fef2f2",
      purple: "#faf5ff",
    };
    const hexBorders: Record<string, string> = {
      white: "#ffffff",
      gray: "#e4e4e7",
      blue: "#bfdbfe",
      green: "#bbf7d0",
      yellow: "#fef08a",
      red: "#fca5a5",
      purple: "#e9d5ff",
    };

    let style = `width: ${width}%; flex-basis: ${width}%; padding: 1rem; border-radius: 0.75rem; transition: all 0.2s;`;
    if (backgroundColor && backgroundColor !== "transparent") {
      style += ` background-color: ${hexColors[backgroundColor] || backgroundColor};`;
    }
    style += ` border-style: solid; border-width: ${borderWidth}; border-color: ${hexBorders[borderColor] || borderColor || "transparent"};`;

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column",
        class: "column",
        style: style.trim(),
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnView);
  },
});

export default Column;
