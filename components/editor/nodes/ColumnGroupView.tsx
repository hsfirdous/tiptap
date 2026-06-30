"use client";

import React, { useRef, useState } from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ColumnGroupView = (props: NodeViewProps) => {
  const { node, editor, getPos } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const getColumnWidths = () => {
    const widths: number[] = [];
    for (let i = 0; i < node.childCount; i++) {
      const width = node.child(i).attrs.width;
      widths.push(typeof width === "number" && !isNaN(width) ? width : 50);
    }
    return widths;
  };

  const handleResize = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsResizing(true);
    const startX = event.clientX;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    if (containerWidth === 0) {
      setIsResizing(false);
      return;
    }

    const leftColumn = node.child(index);
    const rightColumn = node.child(index + 1);
    
    const startLeftWidth =
      typeof leftColumn.attrs.width === "number" && !isNaN(leftColumn.attrs.width)
        ? leftColumn.attrs.width
        : 50;
        
    const startRightWidth =
      typeof rightColumn.attrs.width === "number" && !isNaN(rightColumn.attrs.width)
        ? rightColumn.attrs.width
        : 50;
        
    const totalWidth = startLeftWidth + startRightWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;

      const minWidth = 10;
      let newLeftWidth = Math.max(minWidth, startLeftWidth + deltaPercent);
      let newRightWidth = totalWidth - newLeftWidth;

      if (newRightWidth < minWidth) {
        newRightWidth = minWidth;
        newLeftWidth = totalWidth - minWidth;
      }

      newLeftWidth = Math.round((isNaN(newLeftWidth) ? 50 : newLeftWidth) * 100) / 100;
      newRightWidth = Math.round((isNaN(newRightWidth) ? 50 : newRightWidth) * 100) / 100;

      const tr = editor.state.tr;
      const pos = getPos();
      if (typeof pos !== "number") return;

      let offset = pos + 1;
      for (let i = 0; i < node.childCount; i++) {
        const child = node.child(i);
        if (i === index) {
          tr.setNodeMarkup(offset, undefined, {
            ...child.attrs,
            width: newLeftWidth,
          });
        } else if (i === index + 1) {
          tr.setNodeMarkup(offset, undefined, {
            ...child.attrs,
            width: newRightWidth,
          });
        }
        offset += child.nodeSize;
      }

      editor.view.dispatch(tr);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const widths = getColumnWidths();
  let cumulativeWidth = 0;
  const handles: { index: number; left: number }[] = [];
  for (let i = 0; i < widths.length - 1; i++) {
    cumulativeWidth += widths[i];
    handles.push({ index: i, left: cumulativeWidth });
  }

  return (
    <NodeViewWrapper
      ref={containerRef}
      className={cn("column-group-container relative w-full my-6", isResizing && "select-none")}
      data-type="column-group"
    >
      {/* NodeViewContent is the single container where child columns are rendered by Tiptap */}
      <NodeViewContent
        className="column-group flex flex-row flex-nowrap gap-5 items-stretch w-full"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          gap: "20px",
          alignItems: "stretch",
        }}
      />

      {/* Resize handles rendered absolute over the gap */}
      {handles.map((handle) => (
        <div
          key={`handle-${handle.index}`}
          className="absolute top-0 bottom-0 z-20 cursor-col-resize flex items-center justify-center group/resize-handle"
          style={{
            left: `calc(${handle.left}% - 10px)`,
            width: "20px",
          }}
          onMouseDown={(e) => handleResize(handle.index, e)}
        >
          {/* Resize divider line */}
          <div className="w-[2px] h-full bg-blue-100 dark:bg-zinc-800/80 group-hover/resize-handle:bg-blue-300 transition-colors relative flex items-center justify-center">
            {/* Grab handle with ChevronRight in blue */}
            <div className="absolute w-5 h-5 bg-blue-50 dark:bg-zinc-900 border border-blue-200 dark:border-zinc-800 rounded-md flex items-center justify-center shadow-sm text-blue-600 dark:text-blue-400 group-hover/resize-handle:scale-105 group-hover/resize-handle:border-blue-400 transition-all">
              <ChevronRight size={12} strokeWidth={3} />
            </div>
          </div>
        </div>
      ))}
    </NodeViewWrapper>
  );
};
