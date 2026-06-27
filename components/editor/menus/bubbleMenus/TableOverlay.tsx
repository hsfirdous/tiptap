"use client";

import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import {
  Plus,
  Trash2,
  GripVertical,
  GripHorizontal,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOverlayProps {
  editor: Editor;
}

export const TableOverlay = ({ editor }: TableOverlayProps) => {
  const [hoveredCell, setHoveredCell] = useState<{
    element: HTMLElement;
    row: number;
    col: number;
    table: HTMLElement;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor || !editor.view) return;

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const cell = target.closest("td, th") as HTMLElement;
      const table = target.closest("table") as HTMLElement;

      if (cell && table) {
        const row = (cell.parentElement as HTMLTableRowElement).rowIndex;
        const col = (cell as HTMLTableCellElement).cellIndex;
        setHoveredCell({ element: cell, row, col, table });
      } else {
        // Check if we are hovering over the handles themselves
        if (!target.closest(".table-handle")) {
          setHoveredCell(null);
        }
      }
    };

    const dom = editor.view.dom;
    dom.addEventListener("mousemove", handleMouseMove);
    return () => dom.removeEventListener("mousemove", handleMouseMove);
  }, [editor]);

  if (!hoveredCell) return null;

  const { element, row, col, table } = hoveredCell;
  const tableRect = table.getBoundingClientRect();
  const cellRect = element.getBoundingClientRect();
  const editorRect = editor.view.dom.getBoundingClientRect();

  // Position relative to editor container
  const top = cellRect.top - editorRect.top;
  const left = cellRect.left - editorRect.left;
  const width = cellRect.width;
  const height = cellRect.height;

  const tableTop = tableRect.top - editorRect.top;
  const tableLeft = tableRect.left - editorRect.left;

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Column Handle (Top) */}
      <div
        className="absolute flex flex-col items-center pointer-events-auto table-handle group/col"
        style={{
          top: tableTop - 24,
          left: left + width / 2 - 12,
          width: 24,
        }}
      >
        <button
          onClick={() => {
            editor.chain().focus().addColumnAfter().run();
          }}
          className="p-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-0 group-hover/col:opacity-100 transition-opacity hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-400 hover:text-blue-500"
          title="Add Column"
        >
          <Plus size={12} />
        </button>
        <div className="w-4 h-4 mt-1 flex items-center justify-center text-zinc-300 dark:text-zinc-600 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">
          <GripHorizontal size={14} />
        </div>
      </div>

      {/* Row Handle (Left) */}
      <div
        className="absolute flex items-center pointer-events-auto table-handle group/row"
        style={{
          top: top + height / 2 - 12,
          left: tableLeft - 32,
          height: 24,
        }}
      >
        <button
          onClick={() => {
            editor.chain().focus().addRowAfter().run();
          }}
          className="p-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-400 hover:text-blue-500"
          title="Add Row"
        >
          <Plus size={12} />
        </button>
        <div className="w-4 h-4 ml-1 flex items-center justify-center text-zinc-300 dark:text-zinc-600 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">
          <GripVertical size={14} />
        </div>
      </div>

      {/* Quick Actions (on cell hover) */}
      <div
        className="absolute flex gap-1 pointer-events-auto table-handle"
        style={{
          top: top + 2,
          left: left + width - 24,
        }}
      >
        {/* We could add a mini menu here if needed */}
      </div>
    </div>
  );
};
