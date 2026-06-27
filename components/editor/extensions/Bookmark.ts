import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { BookmarkView } from "@/components/editor/nodes/BookmarkView";

export const Bookmark = Node.create({
  name: "bookmark",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
      title: {
        default: "",
      },
      description: {
        default: "",
      },
      image: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="bookmark"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "bookmark" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BookmarkView);
  },
});

export default Bookmark;
