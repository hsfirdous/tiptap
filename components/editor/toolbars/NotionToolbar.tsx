"use client";

import { Toolbar } from "./Toolbar";
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { DragHandle } from "@tiptap/extension-drag-handle-react";
import { BlockMenu } from "../menus/floatingMenus/BlockMenu";
import { InsertionMenu } from "../menus/floatingMenus/InsertionMenu";
import { BubbleMenu } from "./../menus/bubbleMenus/BubbleMenu";
import { FloatingMenu } from "../menus/floatingMenus/FloatingMenu";
import { TableBubbleMenu } from "../menus/bubbleMenus/TableBubbleMenu";
import { TableOverlay } from "../menus/bubbleMenus/TableOverlay";
import { Plus, GripVertical } from "lucide-react";

interface NotionToolbarProps {
  editor: Editor;
}

export const NotionToolbar = ({ editor }: NotionToolbarProps) => {
  const [activeMenu, setActiveMenu] = useState<"none" | "block" | "insertion">(
    "none",
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />

      <DragHandle
        editor={editor}
        className="flex items-center gap-0.5 opacity-0 group-hover/editor:opacity-100 transition-opacity duration-200"
      >
        <button
          onClick={() =>
            setActiveMenu(activeMenu === "insertion" ? "none" : "insertion")
          }
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <Plus size={18} />
        </button>
        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "block" ? "none" : "block")
            }
            className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </button>

          {activeMenu === "block" && (
            <div className="absolute left-0 top-full mt-2 z-50">
              <div
                className="fixed inset-0"
                onClick={() => setActiveMenu("none")}
              />
              <BlockMenu
                editor={editor}
                onClose={() => setActiveMenu("none")}
              />
            </div>
          )}

          {activeMenu === "insertion" && (
            <div className="absolute left-0 top-full mt-2 z-50">
              <div
                className="fixed inset-0"
                onClick={() => setActiveMenu("none")}
              />
              <InsertionMenu
                editor={editor}
                onSelect={() => setActiveMenu("none")}
              />
            </div>
          )}
        </div>
      </DragHandle>

      <BubbleMenu editor={editor} />
      <TableBubbleMenu editor={editor} />
      <TableOverlay editor={editor} />
      <FloatingMenu editor={editor} />
    </>
  );
};
