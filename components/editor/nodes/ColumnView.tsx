"use client";

import React, { useState } from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { MoreVertical, Copy, Trash2, Plus, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const ColumnView = (props: NodeViewProps) => {
  const { node, editor, getPos } = props;
  const { width, backgroundColor, borderColor } = node.attrs;
  const [menuOpen, setMenuOpen] = useState(false);

  const safeWidth = typeof width === "number" && !isNaN(width) ? width : 50;
  const widthValue = `${safeWidth}%`;

  const colorMap: Record<string, string> = {
    white: "bg-white dark:bg-zinc-900",
    gray: "bg-zinc-50 dark:bg-zinc-800/50",
    blue: "bg-blue-50/50 dark:bg-blue-950/20",
    green: "bg-green-50/50 dark:bg-green-950/20",
    yellow: "bg-yellow-50/50 dark:bg-yellow-950/20",
    red: "bg-red-50/50 dark:bg-red-950/20",
    purple: "bg-purple-50/50 dark:bg-purple-950/20",
    transparent: "bg-transparent",
  };

  const borderColorMap: Record<string, string> = {
    white: "border-zinc-100 dark:border-zinc-800",
    gray: "border-zinc-200 dark:border-zinc-700",
    blue: "border-blue-200 dark:border-blue-800",
    green: "border-green-200 dark:border-green-800",
    yellow: "border-yellow-200 dark:border-yellow-800",
    red: "border-red-200 dark:border-red-800",
    purple: "border-purple-200 dark:border-purple-800",
    transparent: "border-blue-100 dark:border-zinc-800/50", // Default premium light blue-gray border
  };

  const deleteColumn = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    const $pos = editor.state.doc.resolve(pos);
    const parent = $pos.parent;
    const parentPos = $pos.before();

    if (parent.childCount <= 1) {
      editor
        .chain()
        .focus()
        .deleteRange({ from: parentPos, to: parentPos + parent.nodeSize })
        .run();
      return;
    }

    const tr = editor.state.tr;
    tr.delete(pos, pos + node.nodeSize);
    editor.view.dispatch(tr);

    setTimeout(() => {
      const updatedParentNode = editor.state.doc.nodeAt(parentPos);
      if (!updatedParentNode || updatedParentNode.type.name !== "columnGroup") return;
      const newWidth = 100 / updatedParentNode.childCount;
      const resetTr = editor.state.tr;
      let offset = parentPos + 1;
      for (let i = 0; i < updatedParentNode.childCount; i++) {
        const child = updatedParentNode.child(i);
        resetTr.setNodeMarkup(offset, undefined, {
          ...child.attrs,
          width: Math.round(newWidth * 100) / 100,
        });
        offset += child.nodeSize;
      }
      editor.view.dispatch(resetTr);
    }, 0);
    setMenuOpen(false);
  };

  const addColumn = (side: "left" | "right") => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    const $pos = editor.state.doc.resolve(pos);
    const parentPos = $pos.before();

    const tr = editor.state.tr;
    const insertPos = side === "left" ? pos : pos + node.nodeSize;

    const newColumn = editor.schema.nodes.column.create(
      {
        width: 0,
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: "1px",
      },
      [editor.schema.nodes.paragraph.create()]
    );

    tr.insert(insertPos, newColumn);
    editor.view.dispatch(tr);

    setTimeout(() => {
      const updatedParentNode = editor.state.doc.nodeAt(parentPos);
      if (!updatedParentNode || updatedParentNode.type.name !== "columnGroup") return;
      const newWidth = 100 / updatedParentNode.childCount;
      const resetTr = editor.state.tr;
      let offset = parentPos + 1;
      for (let i = 0; i < updatedParentNode.childCount; i++) {
        const child = updatedParentNode.child(i);
        resetTr.setNodeMarkup(offset, undefined, {
          ...child.attrs,
          width: Math.round(newWidth * 100) / 100,
        });
        offset += child.nodeSize;
      }
      editor.view.dispatch(resetTr);
    }, 0);
    setMenuOpen(false);
  };

  const duplicateColumn = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    const $pos = editor.state.doc.resolve(pos);
    const parentPos = $pos.before();

    const tr = editor.state.tr;
    const clonedColumn = node.type.create(node.attrs, node.content);
    tr.insert(pos + node.nodeSize, clonedColumn);
    editor.view.dispatch(tr);

    setTimeout(() => {
      const updatedParentNode = editor.state.doc.nodeAt(parentPos);
      if (!updatedParentNode || updatedParentNode.type.name !== "columnGroup") return;
      const newWidth = 100 / updatedParentNode.childCount;
      const resetTr = editor.state.tr;
      let offset = parentPos + 1;
      for (let i = 0; i < updatedParentNode.childCount; i++) {
        const child = updatedParentNode.child(i);
        resetTr.setNodeMarkup(offset, undefined, {
          ...child.attrs,
          width: Math.round(newWidth * 100) / 100,
        });
        offset += child.nodeSize;
      }
      editor.view.dispatch(resetTr);
    }, 0);
    setMenuOpen(false);
  };

  const resetWidths = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    const $pos = editor.state.doc.resolve(pos);
    const parent = $pos.parent;
    const parentPos = $pos.before();

    const newWidth = 100 / parent.childCount;
    const tr = editor.state.tr;
    let offset = parentPos + 1;
    for (let i = 0; i < parent.childCount; i++) {
      const child = parent.child(i);
      tr.setNodeMarkup(offset, undefined, {
        ...child.attrs,
        width: Math.round(newWidth * 100) / 100,
      });
      offset += child.nodeSize;
    }
    editor.view.dispatch(tr);
    setMenuOpen(false);
  };

  const setColumnColor = (bgColor: string, borderCol: string) => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    const tr = editor.state.tr;
    tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      backgroundColor: bgColor,
      borderColor: borderCol,
    });
    editor.view.dispatch(tr);
    setMenuOpen(false);
  };

  const colors = [
    { name: "Default", bg: "transparent", border: "transparent" },
    { name: "Gray", bg: "gray", border: "gray" },
    { name: "Blue", bg: "blue", border: "blue" },
    { name: "Green", bg: "green", border: "green" },
    { name: "Yellow", bg: "yellow", border: "yellow" },
    { name: "Red", bg: "red", border: "red" },
    { name: "Purple", bg: "purple", border: "purple" },
  ];

  return (
    <NodeViewWrapper
      as="div"
      className={cn(
        "column relative flex flex-col rounded-2xl border transition-all duration-200 p-5 group/col-box min-w-0 overflow-hidden break-words h-full",
        colorMap[backgroundColor] || colorMap.transparent,
        borderColorMap[borderColor] || borderColorMap.transparent
      )}
      style={{
        flex: `0 0 ${widthValue}`,
        maxWidth: widthValue,
        width: widthValue,
        boxSizing: "border-box",
      }}
      data-type="column"
    >
      {/* Column Content Area */}
      <div className="w-full break-words overflow-x-auto no-scrollbar flex-1 min-h-[50px] pr-2">
        <NodeViewContent
          as="div"
          className="w-full h-full outline-none prose max-w-none focus:outline-none"
        />
      </div>

      {/* Menu Actions Trigger Button - Blue Dots (Always visible or visible on hover) */}
      <div className="absolute top-3 right-3 z-30">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded-md bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all opacity-100 group-hover/col-box:opacity-100 cursor-pointer shadow-none border-none outline-none focus:outline-none"
        >
          <MoreVertical size={16} strokeWidth={2.5} />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <>
            {/* Background overlay to close menu */}
            <div
              className="fixed inset-0 z-40 bg-transparent cursor-default"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen(false);
              }}
            />
            {/* Menu options card */}
            <div
              className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Column Actions
              </div>
              <button
                onClick={() => addColumn("left")}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <Plus size={14} className="text-zinc-400" />
                Add Column Left
              </button>
              <button
                onClick={() => addColumn("right")}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <Plus size={14} className="text-zinc-400" />
                Add Column Right
              </button>
              <button
                onClick={duplicateColumn}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <Copy size={14} className="text-zinc-400" />
                Duplicate Column
              </button>
              <button
                onClick={resetWidths}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <RefreshCcw size={14} className="text-zinc-400" />
                Reset Column Widths
              </button>
              
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
              <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Background Color
              </div>
              <div className="grid grid-cols-7 gap-1 px-3 py-1.5">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setColumnColor(color.bg, color.border)}
                    title={color.name}
                    className={cn(
                      "w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 cursor-pointer transition-transform hover:scale-110",
                      color.bg === "transparent"
                        ? "bg-white dark:bg-zinc-900 relative overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_45%,#ef4444_45%,#ef4444_55%,transparent_55%)]"
                        : color.bg === "gray"
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : color.bg === "blue"
                        ? "bg-blue-100 dark:bg-blue-900"
                        : color.bg === "green"
                        ? "bg-green-100 dark:bg-green-900"
                        : color.bg === "yellow"
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : color.bg === "red"
                        ? "bg-red-100 dark:bg-red-900"
                        : "bg-purple-100 dark:bg-purple-900"
                    )}
                  />
                ))}
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
              <button
                onClick={deleteColumn}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <Trash2 size={14} className="text-red-500" />
                Delete Column
              </button>
            </div>
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
};
