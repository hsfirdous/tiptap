"use client";

import React, { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize,
  Trash2,
  RefreshCw,
  MoreVertical,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ImageNodeView = (props: NodeViewProps) => {
  const { node, updateAttributes, editor, getPos, selected } = props;
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState(node.attrs.src);

  const handleResize = (
    direction: "left" | "right",
    event: React.MouseEvent,
  ) => {
    event.preventDefault();
    setIsResizing(true);

    const startX = event.clientX;
    const startWidth = containerRef.current?.offsetWidth || 0;
    const parentWidth = containerRef.current?.parentElement?.offsetWidth || 1;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth =
        direction === "right" ? startWidth + deltaX : startWidth - deltaX;
      const widthPercent = Math.max(
        10,
        Math.min(100, (newWidth / parentWidth) * 100),
      );

      updateAttributes({ width: `${widthPercent}%` });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const deleteImage = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
  };

  const handleUrlSubmit = () => {
    if (tempUrl) updateAttributes({ src: tempUrl });
    setShowUrlInput(false);
  };

  const isEmpty = !node.attrs.src;

  return (
    <NodeViewWrapper
      ref={containerRef}
      className={cn(
        "relative my-8 group/image flex flex-col",
        node.attrs.align === "left" && "items-start",
        node.attrs.align === "center" && "items-center",
        node.attrs.align === "right" && "items-end",
        node.attrs.align === "full" && "w-full",
      )}
      style={{ width: node.attrs.width }}
    >
      <div className="relative w-full group">
        {showUrlInput || isEmpty ? (
          <div className="w-full p-8 bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-zinc-400">
              <RefreshCw size={24} />
              <span className="text-sm font-medium">Add Image</span>
            </div>
            <div className="flex w-full max-w-md items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <input
                autoFocus
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUrlSubmit();
                  if (e.key === "Escape" && !isEmpty) setShowUrlInput(false);
                }}
                className="flex-1 bg-transparent border-none outline-none text-sm px-2"
                placeholder="Paste image URL..."
              />
              <button
                onClick={handleUrlSubmit}
                className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-md transition-colors hover:bg-zinc-800 dark:hover:bg-white"
              >
                Add
              </button>
            </div>
            {!isEmpty && (
              <button
                onClick={() => setShowUrlInput(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <>
            <img
              src={node.attrs.src}
              alt={node.attrs.alt}
              className={cn(
                "rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg block w-full transition-shadow",
                selected && "ring-2 ring-blue-500 shadow-xl",
              )}
              onClick={() => setShowToolbar(!showToolbar)}
            />

            {/* Resizing Handles */}
            <div
              className="absolute top-1/2 -right-1 w-2 h-12 -translate-y-1/2 bg-zinc-400/50 hover:bg-blue-500 rounded-full cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onMouseDown={(e) => handleResize("right", e)}
            />
            <div
              className="absolute top-1/2 -left-1 w-2 h-12 -translate-y-1/2 bg-zinc-400/50 hover:bg-blue-500 rounded-full cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onMouseDown={(e) => handleResize("left", e)}
            />

            {/* Image Toolbar */}
            <div
              className={cn(
                "absolute top-4 right-4 flex items-center gap-1 p-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-20",
                showToolbar && "opacity-100",
              )}
            >
              <button
                onClick={() => updateAttributes({ align: "left" })}
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  node.attrs.align === "left" && "text-blue-500",
                )}
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() => updateAttributes({ align: "center" })}
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  node.attrs.align === "center" && "text-blue-500",
                )}
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => updateAttributes({ align: "right" })}
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  node.attrs.align === "right" && "text-blue-500",
                )}
              >
                <AlignRight size={16} />
              </button>
              <button
                onClick={() =>
                  updateAttributes({ align: "full", width: "100%" })
                }
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  node.attrs.align === "full" && "text-blue-500",
                )}
              >
                <Maximize size={16} />
              </button>
              <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />
              <button
                onClick={() => setShowUrlInput(true)}
                className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={deleteImage}
                className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      <input
        type="text"
        placeholder="Write a caption..."
        value={node.attrs.caption}
        onChange={(e) => updateAttributes({ caption: e.target.value })}
        className="mt-3 bg-transparent text-center text-sm text-zinc-500 dark:text-zinc-400 outline-none w-full"
      />
    </NodeViewWrapper>
  );
};
