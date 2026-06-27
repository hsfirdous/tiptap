import { Editor } from "@tiptap/react";

export const toggleBold = (editor: Editor) =>
  editor.chain().focus().toggleBold().run();
export const toggleItalic = (editor: Editor) =>
  editor.chain().focus().toggleItalic().run();
export const toggleUnderline = (editor: Editor) =>
  editor.chain().focus().toggleUnderline().run();
export const toggleStrike = (editor: Editor) =>
  editor.chain().focus().toggleStrike().run();
export const toggleSuperscript = (editor: Editor) =>
  editor.chain().focus().toggleSuperscript().run();
export const toggleSubscript = (editor: Editor) =>
  editor.chain().focus().toggleSubscript().run();

export const setTextAlign = (
  editor: Editor,
  alignment: "left" | "center" | "right" | "justify",
) => {
  return editor.chain().focus().setTextAlign(alignment).run();
};

export const toggleBulletList = (editor: Editor) =>
  editor.chain().focus().toggleBulletList().run();
export const toggleOrderedList = (editor: Editor) =>
  editor.chain().focus().toggleOrderedList().run();

export const indent = (editor: Editor) =>
  editor.chain().focus().sinkListItem("listItem").run();
export const outdent = (editor: Editor) =>
  editor.chain().focus().liftListItem("listItem").run();

export const setParagraph = (editor: Editor) =>
  editor.chain().focus().setParagraph().run();
export const getHighestHeadingHierarchy = (editor: Editor): number => {
  const levels = new Set<number>();
  editor.state.doc.descendants((node) => {
    if (node.type.name === "heading") {
      levels.add(node.attrs.level);
    }
  });

  let highest = 1;
  for (let i = 2; i <= 6; i++) {
    if (levels.has(i)) {
      highest = i;
    } else {
      break;
    }
  }
  return highest;
};

export const toggleHeading = (editor: Editor, level: 2 | 3 | 4 | 5 | 6) => {
  const highest = getHighestHeadingHierarchy(editor);

  // Allow level 1 always (to start the hierarchy)
  // Allow same level or next level (highest + 1)
  if (level > highest + 1) {
    alert("SEO warning: Heading levels should not be skipped.");
    return false;
  }

  return editor.chain().focus().toggleHeading({ level }).run();
};
export const toggleBlockquote = (editor: Editor) =>
  editor.chain().focus().toggleBlockquote().run();
export const toggleCodeBlock = (editor: Editor) =>
  editor.chain().focus().toggleCodeBlock().run();

export const convertToCallout = (editor: Editor) => {
  if (editor.isActive("callout")) {
    return editor.chain().focus().setParagraph().run();
  }
  return editor.chain().focus().insertContent({ type: "callout" }).run();
};

// Clipboard Actions
export const copy = async (editor: Editor) => {
  if (editor.state.selection.empty) return;

  try {
    // Try modern Clipboard API first for rich text
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      window.ClipboardItem
    ) {
      const { view } = editor;
      const { state } = view;
      const { from, to } = state.selection;

      // We use a temporary container to render the selection as HTML
      // Tiptap's internal way to get HTML from a selection:
      // @ts-ignore
      const html = editor.options.element.ownerDocument.createElement("div");
      const fragment = state.doc.slice(from, to).content.toJSON();
      // This is complex to do manually perfectly, let's use document.execCommand('copy') as it's still the most robust for rich text
      document.execCommand("copy");
    } else {
      document.execCommand("copy");
    }
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

export const cut = (editor: Editor) => {
  if (editor.state.selection.empty) return;
  document.execCommand("cut");
};

export const paste = async (editor: Editor) => {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      navigator.clipboard.read
    ) {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        if (item.types.includes("text/html")) {
          const blob = await item.getType("text/html");
          const html = await blob.text();
          editor.chain().focus().insertContent(html).run();
          return;
        } else if (item.types.includes("text/plain")) {
          const blob = await item.getType("text/plain");
          const text = await blob.text();
          editor.chain().focus().insertContent(text).run();
          return;
        }
      }
    } else {
      // Fallback
      document.execCommand("paste");
    }
  } catch (err) {
    console.warn("Clipboard read access denied or failed:", err);
    // Most browsers block programatic paste unless it's a real paste event
    // So we just show a hint to the user via console or potentially a toast (if we had one)
    document.execCommand("paste");
  }
};
