"use client";

import React from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { cn } from "@/lib/utils";

export const ColumnView = (props: NodeViewProps) => {
  const { node } = props;
  const { width, backgroundColor, borderColor, borderWidth } = node.attrs;

  const colorMap: Record<string, string> = {
    white: "bg-white dark:bg-zinc-950",
    gray: "bg-zinc-100 dark:bg-zinc-900",
    blue: "bg-blue-50 dark:bg-blue-950/30",
    green: "bg-green-50 dark:bg-green-950/30",
    yellow: "bg-yellow-50 dark:bg-yellow-950/30",
    red: "bg-red-50 dark:bg-red-950/30",
    purple: "bg-purple-50 dark:bg-purple-950/30",
    transparent: "bg-transparent",
  };

  const borderColorMap: Record<string, string> = {
    white: "border-white dark:border-zinc-950",
    gray: "border-zinc-200 dark:border-zinc-800",
    blue: "border-blue-200 dark:border-blue-800",
    green: "border-green-200 dark:border-green-800",
    yellow: "border-yellow-200 dark:border-yellow-800",
    red: "border-red-200 dark:border-red-800",
    purple: "border-purple-200 dark:border-purple-800",
    transparent: "border-transparent",
  };

  return (
    <NodeViewWrapper
      className={cn(
        "column",
        "flex-shrink-0 min-w-0 overflow-hidden break-words",
        "rounded-xl border transition-all",
        "p-4",
        colorMap[backgroundColor] || colorMap.transparent,
        borderColorMap[borderColor] || borderColorMap.transparent,
      )}
      style={{
        width: typeof width === "number" ? `${width}%` : width,
        flexBasis: typeof width === "number" ? `${width}%` : width,
        borderWidth: borderWidth || "1px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="w-full break-words overflow-x-auto no-scrollbar"
        style={{ wordBreak: "break-word", wordWrap: "break-word" }}
      >
        <NodeViewContent className="min-h-[2rem] w-full" />
      </div>
    </NodeViewWrapper>
  );
};
