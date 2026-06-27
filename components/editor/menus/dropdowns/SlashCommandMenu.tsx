"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Command } from "cmdk";
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  MessageSquare,
  Columns,
  Layout,
  Play,
  Share2,
  Bookmark as BookmarkIcon,
  File as FileIcon,
  List as ListIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { SuggestionItem } from "@/types/editor";
import { BackgroundColor } from "@tiptap/extension-text-style";

export const getSuggestionItems = ({
  editor,
}: {
  editor: Editor;
}): SuggestionItem[] => {
  return [
    {
      title: "Text",
      description: "Just start writing with plain text.",
      searchTerms: ["p", "paragraph"],
      icon: Type,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setParagraph().run();
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      searchTerms: ["h1", "big"],
      icon: Heading1,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      searchTerms: ["h2", "medium"],
      icon: Heading2,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      searchTerms: ["h3", "small"],
      icon: Heading3,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bulleted list.",
      searchTerms: ["unordered", "point"],
      icon: List,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      searchTerms: ["ordered", "123"],
      icon: ListOrdered,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Todo List",
      description: "Track tasks with a todo list.",
      searchTerms: ["todo", "task", "check"],
      icon: CheckSquare,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: "Quote",
      description: "Capture a quotation.",
      searchTerms: ["blockquote"],
      icon: Quote,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      searchTerms: ["codeblock", "pre"],
      icon: Code,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: "Table",
      description: "Insert a 3x3 table.",
      searchTerms: ["table", "grid"],
      icon: TableIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
      },
    },
    {
      title: "Image",
      description: "Upload or insert an image.",
      searchTerms: ["photo", "picture"],
      icon: ImageIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
      },
    },
    {
      title: "Divider",
      description: "Visually divide sections.",
      searchTerms: ["hr", "line"],
      icon: Minus,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      title: "Callout",
      description: "Add a block with an icon.",
      searchTerms: ["info", "alert", "box"],
      icon: MessageSquare,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({ type: "callout" })
          .run();
      },
    },
    {
      title: "Columns",
      description: "Split the layout into two.",
      searchTerms: ["column", "layout", "side"],
      icon: Columns,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({
            type: "columnGroup",
            content: [
              {
                type: "column",
                attrs: { width: "50" },
                content: [{ type: "paragraph" }],
              },
              {
                type: "column",
                attrs: { width: "50" },
                content: [{ type: "paragraph" }],
              },
            ],
          })
          .run();
      },
    },
    {
      title: "Toggle",
      description: "Collapse content inside.",
      searchTerms: ["details", "accordion"],
      icon: Play,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({ type: "toggle" })
          .run();
      },
    },
    {
      title: "Embed",
      description: "Embed video, tweets, and more.",
      searchTerms: ["youtube", "twitter", "video"],
      icon: Share2,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({ type: "embed", attrs: { url: "" } })
          .run();
      },
    },
    {
      title: "Bookmark",
      description: "Save a link as a card.",
      searchTerms: ["link", "card"],
      icon: BookmarkIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({ type: "bookmark", attrs: { url: "" } })
          .run();
      },
    },
    {
      title: "File",
      description: "Upload a file attachment.",
      searchTerms: ["upload", "attachment"],
      icon: FileIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({
            type: "fileAttachment",
            attrs: { url: "", name: "" },
          })
          .run();
      },
    },
    {
      title: "Table of Contents",
      description: "Show an overview of your page.",
      searchTerms: ["toc", "index"],
      icon: ListIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({ type: "tableOfContents" })
          .run();
      },
    },
  ];
};

export const SlashCommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    },
    [props],
  );

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length,
        );
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [props.items]);

  return (
    <Command className="z-50 min-w-[320px] overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
      <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-1 scrollbar-thin">
        {props.items.length === 0 && (
          <div className="px-2 py-3 text-sm text-zinc-500">
            No results found.
          </div>
        )}
        {props.items.map((item: SuggestionItem, index: number) => (
          <Command.Item
            key={index}
            onSelect={() => selectItem(index)}
            className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors cursor-pointer ${
              index === selectedIndex
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
              <item.icon size={18} className="text-zinc-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-[11px] text-zinc-400">
                {item.description}
              </span>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
});

SlashCommandList.displayName = "SlashCommandList";
