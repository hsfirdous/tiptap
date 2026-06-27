import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { TableOfContentsView } from "@/components/editor/nodes/TableOfContentsView";

export const TableOfContents = Node.create({
  name: "tableOfContents",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="toc"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "toc" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableOfContentsView);
  },
});

export default TableOfContents;
