import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { ImageNodeView } from "@/components/editor/nodes/ImageNodeView";

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: (attributes) => ({
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: "auto",
      },
      align: {
        default: "center",
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
        }),
      },
      caption: {
        default: "",
      },
      alt: {
        default: "",
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export default ResizableImage;
