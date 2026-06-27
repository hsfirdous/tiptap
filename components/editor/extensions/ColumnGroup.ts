import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ColumnGroupView } from "@/components/editor/nodes/ColumnGroupView";

export const ColumnGroup = Node.create({
  name: "columnGroup",
  group: "block",
  content: "column+",

  addAttributes() {
    return {
      layout: {
        default: "two-column",
        parseHTML: (element) => element.getAttribute("data-layout"),
        renderHTML: (attributes) => ({ "data-layout": attributes.layout }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div[data-type="column-group"]' },
      { tag: "div.column-group" },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column-group",
        class: "column-group w-full flex flex-row flex-nowrap gap-4 mb-4",
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnGroupView);
  },
});

export default ColumnGroup;
