import { Node, mergeAttributes } from "@tiptap/core";

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",

  addAttributes() {
    return {
      color: {
        default: "gray",
        parseHTML: (element) => element.getAttribute("data-color"),
        renderHTML: (attributes) => ({
          "data-color": attributes.color,
        }),
      },
      emoji: {
        default: "💡",
        parseHTML: (element) => element.getAttribute("data-emoji"),
        renderHTML: (attributes) => ({
          "data-emoji": attributes.emoji,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { color, emoji } = HTMLAttributes;
    const colorClasses: Record<string, string> = {
      gray: "bg-zinc-100 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800",
      blue: "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
      green:
        "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800",
      yellow:
        "bg-yellow-50 border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-800",
      red: "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800",
      purple:
        "bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800",
    };

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "callout",
        class: `flex gap-3 p-4 rounded-xl border ${colorClasses[color] || colorClasses.gray} mb-4`,
      }),
      [
        "span",
        { class: "text-xl select-none", contenteditable: "false" },
        emoji,
      ],
      ["div", { class: "flex-1 min-w-0" }, 0],
    ];
  },
});

export default Callout;
