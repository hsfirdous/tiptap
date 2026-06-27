"use client";

import React from "react";
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
  MessageSquare,
  Play,
} from "lucide-react";
import { Editor } from "@tiptap/react";

interface TurnIntoMenuProps {
  editor: Editor;
  onSelect: () => void;
}

export const TurnIntoMenu = ({ editor, onSelect }: TurnIntoMenuProps) => {
  const items = [
    {
      icon: <Type size={16} />,
      label: "Text",
      command: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: <Heading1 size={16} />,
      label: "Heading 1",
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 size={16} />,
      label: "Heading 2",
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 size={16} />,
      label: "Heading 3",
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <List size={16} />,
      label: "Bullet List",
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered size={16} />,
      label: "Ordered List",
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <CheckSquare size={16} />,
      label: "Todo List",
      command: () => editor.chain().focus().toggleTaskList().run(),
    },
    {
      icon: <Quote size={16} />,
      label: "Quote",
      command: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: <Code size={16} />,
      label: "Code Block",
      command: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      icon: <MessageSquare size={16} />,
      label: "Callout",
      command: () =>
        editor.chain().focus().insertContent({ type: "callout" }).run(),
    },
    {
      icon: <Play size={16} />,
      label: "Toggle",
      command: () =>
        editor.chain().focus().insertContent({ type: "toggle" }).run(),
    },
  ];

  return (
    <div className="flex flex-col w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        Turn into
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              item.command();
              onSelect();
            }}
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <span className="text-zinc-400">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
