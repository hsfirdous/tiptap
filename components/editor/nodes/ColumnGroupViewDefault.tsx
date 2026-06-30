"use client";

import React, { useRef, useState } from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import {
  MoreVertical,
  Copy,
  Trash2,
  Plus,
  RefreshCcw,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ColumnGroupView = (props: NodeViewProps) => {
  const { node, editor, getPos } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleResize = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    const leftColumn = node.child(index);
    const rightColumn = node.child(index + 1);
    const startLeftWidth = leftColumn.attrs.width;
    const startRightWidth = rightColumn.attrs.width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;

      const minWidth = 10;
      let newLeftWidth = Math.max(minWidth, startLeftWidth + deltaPercent);
      let newRightWidth = startLeftWidth + startRightWidth - newLeftWidth;

      if (newRightWidth < minWidth) {
        newRightWidth = minWidth;
        newLeftWidth = startLeftWidth + startRightWidth - minWidth;
      }

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
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const deleteColumn = (index: number) => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    if (node.childCount <= 1) {
      editor
        .chain()
        .focus()
        .deleteRange({ from: pos, to: pos + node.nodeSize })
        .run();
      return;
    }

    const tr = editor.state.tr;
    let offset = pos + 1;
    for (let i = 0; i < index; i++) {
      offset += node.child(i).nodeSize;
    }

    tr.delete(offset, offset + node.child(index).nodeSize);
    editor.view.dispatch(tr);
    resetWidths();
    setActiveMenu(null);
  };

  const addColumn = (side: "left" | "right", index: number) => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    const tr = editor.state.tr;
    let offset = pos + 1;

    const insertIndex = side === "left" ? index : index + 1;
    for (let i = 0; i < insertIndex; i++) {
      offset += node.child(i).nodeSize;
    }

    const newColumn = editor.schema.nodes.column.create({ width: 0 }, [
      editor.schema.nodes.paragraph.create(),
    ]);

    tr.insert(offset, newColumn);
    editor.view.dispatch(tr);
    resetWidths();
    setActiveMenu(null);
  };

  const resetWidths = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    const updatedNode = editor.state.doc.nodeAt(pos);
    if (!updatedNode || updatedNode.type.name !== "columnGroup") return;

    const newWidth = 100 / updatedNode.childCount;
    const tr = editor.state.tr;
    let offset = pos + 1;
    for (let i = 0; i < updatedNode.childCount; i++) {
      const child = updatedNode.child(i);
      tr.setNodeMarkup(offset, undefined, { ...child.attrs, width: newWidth });
      offset += child.nodeSize;
    }
    editor.view.dispatch(tr);
    setActiveMenu(null);
  };

  const duplicateColumn = (index: number) => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    const tr = editor.state.tr;
    let offset = pos + 1;

    for (let i = 0; i < index; i++) {
      offset += node.child(i).nodeSize;
    }

    const columnToDuplicate = node.child(index);
    const clonedColumn = columnToDuplicate.type.create(
      columnToDuplicate.attrs,
      columnToDuplicate.content,
    );

    tr.insert(offset + columnToDuplicate.nodeSize, clonedColumn);
    editor.view.dispatch(tr);
    resetWidths();
    setActiveMenu(null);
  };

  const setColumnColor = (
    index: number,
    backgroundColor: string,
    borderColor: string,
  ) => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    const tr = editor.state.tr;
    let offset = pos + 1;
    for (let i = 0; i < index; i++) {
      offset += node.child(i).nodeSize;
    }

    const child = node.child(index);
    tr.setNodeMarkup(offset, undefined, {
      ...child.attrs,
      backgroundColor,
      borderColor,
    });
    editor.view.dispatch(tr);
    setActiveMenu(null);
  };

  const colors = [
    { name: "Transparent", bg: "transparent", border: "transparent" },
    { name: "Gray", bg: "gray", border: "gray" },
    { name: "Blue", bg: "blue", border: "blue" },
    { name: "Green", bg: "green", border: "green" },
    { name: "Yellow", bg: "yellow", border: "yellow" },
    { name: "Red", bg: "red", border: "red" },
    { name: "Purple", bg: "purple", border: "purple" },
  ];

  let cumulativeWidth = 0;
  const handles: { index: number; left: number }[] = [];
  for (let i = 0; i < node.childCount - 1; i++) {
    cumulativeWidth += node.child(i).attrs.width || 0;
    handles.push({ index: i, left: cumulativeWidth });
  }

  return (
    <NodeViewWrapper
      ref={containerRef}
      className="column-group-container relative my-8 group/columns w-full"
    >
      {/* Column Menus */}
      <div className="hidden sm:block">
        {Array.from({ length: node.childCount }).map((_, i) => (
          <div
            key={i}
            className="absolute z-30"
            style={{
              left: `${i === 0 ? 0 : handles[i - 1].left}%`,
              top: -24,
              width: `${node.child(i).attrs.width}%`,
            }}
          >
            <div className="flex justify-center w-full">
              <button
                onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 opacity-0 group-hover/columns:opacity-100 transition-opacity"
              >
                <MoreVertical size={14} />
              </button>
            </div>

            {activeMenu === i && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 py-1 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                    Column Actions
                  </div>
                  <button
                    onClick={() => addColumn("left", i)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Plus size={14} /> Add Left
                  </button>
                  <button
                    onClick={() => addColumn("right", i)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Plus size={14} /> Add Right
                  </button>
                  <button
                    onClick={() => duplicateColumn(i)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Copy size={14} /> Duplicate
                  </button>
                  <button
                    onClick={() => resetWidths()}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <RefreshCcw size={14} /> Reset Widths
                  </button>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                  <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                    Colors
                  </div>
                  <div className="grid grid-cols-7 gap-1 px-2 pb-1.5">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() =>
                          setColumnColor(i, color.bg, color.border)
                        }
                        title={color.name}
                        className={cn(
                          "w-6 h-6 rounded-md border border-zinc-200 dark:border-zinc-700",
                          color.bg === "transparent"
                            ? "bg-white dark:bg-zinc-950 relative overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_45%,#ef4444_45%,#ef4444_55%,transparent_55%)]"
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
                                      : "bg-purple-100 dark:bg-purple-900",
                        )}
                      />
                    ))}
                  </div>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                  <button
                    onClick={() => deleteColumn(i)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={14} /> Delete Column
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* critical change here: added inline style for display: flex */}
      <NodeViewContent
        className="column-group w-full flex flex-row flex-nowrap gap-4 items-stretch"
        data-type="column-group"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          gap: "1rem",
          alignItems: "stretch",
        }}
      />

      {/* Handles */}
      <div className="hidden sm:block">
        {handles.map((handle) => (
          <div
            key={handle.index}
            className="absolute top-0 bottom-0 w-1 cursor-col-resize z-20 hover:bg-blue-500 transition-colors opacity-0 group-hover/columns:opacity-100"
            style={{ left: `calc(${handle.left}% - 0.5rem)` }}
            onMouseDown={(e) => handleResize(handle.index, e)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center shadow-sm">
              <GripVertical size={10} className="text-zinc-400" />
            </div>
          </div>
        ))}
      </div>
    </NodeViewWrapper>
  );
};

// "use client";

// import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

// export function ColumnGroupView() {
//   return (
//     <NodeViewWrapper
//       className="column-group"
//       style={{
//         display: "flex",
//         width: "100%",
//         gap: "16px",
//       }}
//     >
//       <NodeViewContent
//         className="column-group-content"
//         style={{
//           display: "flex",
//           width: "100%",
//           gap: "16px",
//         }}
//       />
//     </NodeViewWrapper>
//   );
// }
