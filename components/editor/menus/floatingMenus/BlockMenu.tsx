"use client";

import React, { useState } from "react";
import {
  Trash2,
  Copy,
  ChevronRight,
  Type,
  Heading1,
  Quote,
  Palette,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon,
  MessageSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Selection, NodeSelection } from "@tiptap/pm/state";
import { cn } from "@/lib/utils";
import { ColorMenu } from "../dropdowns/ColorMenu";
import { TurnIntoMenu } from "./TurnIntoMenu";
import * as ColorCommands from "@/components/editor/commands/color";
import * as FormatCommands from "@/components/editor/commands/formatting";

interface BlockMenuProps {
  editor: Editor;
  onClose: () => void;
}

/**
 * PRODUCTION-READY BLOCK RANGE DETECTION
 * Correctly identifies the start and end positions of the current block.
 * Handles nested blocks (like list items, task items) by finding the correct depth.
 */
const getBlockRange = (editor: Editor) => {
  const { selection } = editor.state;
  const { $from } = selection;

  // Logic: Find the highest parent that is not the document root.
  // For standard Notion-like behavior, we target the block at depth 1
  // UNLESS we are inside a list or nested structure where the block should be the item itself.
  let depth = $from.depth;
  while (depth > 0) {
    const node = $from.node(depth);
    // Common block types that should be treated as the "unit" for move/delete/duplicate
    if (
      node.type.name === "listItem" ||
      node.type.name === "taskItem" ||
      node.type.name === "callout" ||
      node.type.name === "toggle" ||
      depth === 1
    ) {
      break;
    }
    depth--;
  }

  // Safety fallback to top level
  if (depth === 0) depth = 1;

  const start = $from.before(depth);
  const end = $from.after(depth);
  const node = $from.node(depth);

  return { start, end, node, depth };
};

export const BlockMenu = ({ editor, onClose }: BlockMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<"none" | "color" | "turnInto">(
    "none",
  );

  /**
   * DUPLICATE BLOCK
   * Uses ProseMirror transactions to clone the node and insert it immediately after.
   */
  const duplicateBlock = () => {
    const { end, node } = getBlockRange(editor);
    const { tr } = editor.state;

    // Insert the node after the current block range
    tr.insert(end, node);

    // Set selection to the new duplicated block
    const newPos = end + 1;
    tr.setSelection(Selection.near(tr.doc.resolve(newPos)));

    editor.view.dispatch(tr.scrollIntoView());
    editor.view.focus();
    onClose();
  };

  /**
   * DELETE BLOCK
   * Reliably removes the entire block node using proper range deletion.
   */
  const deleteBlock = () => {
    const { start, end } = getBlockRange(editor);
    const { tr } = editor.state;

    tr.delete(start, end);

    editor.view.dispatch(tr.scrollIntoView());
    editor.view.focus();
    onClose();
  };

  /**
   * MOVE UP
   * Swaps the current block with its previous sibling block.
   */
  const moveUp = () => {
    const { start, end, node, depth } = getBlockRange(editor);
    const $pos = editor.state.doc.resolve(start);

    // The previous sibling starts before our current block
    const prevSibling = $pos.nodeBefore;
    if (!prevSibling) return onClose();

    const prevSiblingPos = start - prevSibling.nodeSize;
    const tr = editor.state.tr;

    // Delete current block and insert it before the previous sibling
    tr.delete(start, end);
    tr.insert(prevSiblingPos, node);

    // Maintain selection on the moved block
    tr.setSelection(NodeSelection.create(tr.doc, prevSiblingPos));

    editor.view.dispatch(tr.scrollIntoView());
    editor.view.focus();
    onClose();
  };

  /**
   * MOVE DOWN
   * Swaps the current block with its next sibling block.
   */
  const moveDown = () => {
    const { start, end, node } = getBlockRange(editor);
    const $pos = editor.state.doc.resolve(end);

    const nextSibling = $pos.nodeAfter;
    if (!nextSibling) return onClose();

    const tr = editor.state.tr;
    const nextSiblingEnd = end + nextSibling.nodeSize;

    // Delete current block and insert it after the next sibling
    tr.delete(start, end);
    // Map the position because the deletion shifted everything
    const insertPos = tr.mapping.map(nextSiblingEnd);
    tr.insert(insertPos - node.nodeSize, node);

    // Maintain selection on the moved block
    tr.setSelection(NodeSelection.create(tr.doc, insertPos - node.nodeSize));

    editor.view.dispatch(tr.scrollIntoView());
    editor.view.focus();
    onClose();
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    onClose();
  };

  return (
    <div className="w-64 overflow-visible rounded-xl border border-zinc-200 bg-white py-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
        Block Actions
      </div>

      <div className="flex flex-col gap-0.5 px-1">
        <button
          onClick={duplicateBlock}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Copy size={16} className="text-zinc-400" />
          <span>Duplicate</span>
        </button>

        <div className="relative group/item">
          <button
            onMouseEnter={() => setActiveMenu("turnInto")}
            className="flex w-full items-center justify-between px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Type size={16} className="text-zinc-400" />
              <span>Turn into</span>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
          {activeMenu === "turnInto" && (
            <div className="absolute left-full top-0 ml-1">
              <TurnIntoMenu editor={editor} onSelect={onClose} />
            </div>
          )}
        </div>

        <div className="relative group/item">
          <button
            onMouseEnter={() => setActiveMenu("color")}
            className="flex w-full items-center justify-between px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-zinc-400" />
              <span>Color</span>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
          {activeMenu === "color" && (
            <div className="absolute left-full top-0 ml-1">
              <ColorMenu
                onSelectText={(color) => {
                  ColorCommands.setTextColor(editor, color);
                  onClose();
                }}
                onSelectBg={(color) => {
                  ColorCommands.setHighlightColor(editor, color);
                  onClose();
                }}
              />
            </div>
          )}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-1" />

        <button
          onClick={copyLink}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <LinkIcon size={16} className="text-zinc-400" />
          <span>Copy link</span>
        </button>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-1" />

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Heading1 size={16} className="text-zinc-400" />
          <span>Convert to Heading</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Quote size={16} className="text-zinc-400" />
          <span>Convert to Quote</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().insertContent({ type: "callout" }).run()
          }
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <MessageSquare size={16} className="text-zinc-400" />
          <span>Convert to Callout</span>
        </button>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-1" />

        <button
          onClick={moveUp}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ChevronUp size={16} className="text-zinc-400" />
          <span>Move up</span>
        </button>
        <button
          onClick={moveDown}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ChevronDown size={16} className="text-zinc-400" />
          <span>Move down</span>
        </button>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-1" />

        <button
          onClick={deleteBlock}
          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
