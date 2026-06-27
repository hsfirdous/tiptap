import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { FileAttachmentView } from "@/components/editor/nodes/FileAttachmentView";

export const FileAttachment = Node.create({
  name: "fileAttachment",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      name: {
        default: "Document.pdf",
      },
      size: {
        default: "0 KB",
      },
      url: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="file"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "file" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileAttachmentView);
  },
});

export default FileAttachment;
