import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { EmbedView } from "@/components/editor/nodes/EmbedView";

export const Embed = Node.create({
  name: "embed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
      type: {
        default: "video", // video, tweet, codepen, gist
      },
      width: {
        default: "100%",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "embed" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedView);
  },
});

export default Embed;
