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
        // 1. REMOVE 'w-full' and 'flex-1'
        "min-w-0 overflow-hidden break-words",
        "rounded-xl border transition-all",
        "p-4",
        colorMap[backgroundColor] || colorMap.transparent,
        borderColorMap[borderColor] || borderColorMap.transparent,
      )}
      style={
        {
          // 2. Use flex-basis instead of width
          // This allows the browser to fit the columns even with a gap
          flex: `0 0 ${typeof width === "number" ? `${width}%` : width}`,
          maxWidth: typeof width === "number" ? `${width}%` : width,
          borderWidth: borderWidth || "1px",
          boxSizing: "border-box", // Ensures padding doesn't add to width
        } as React.CSSProperties
      }
      data-type="column"
    >
      <div className="w-full break-words overflow-x-auto no-scrollbar">
        <NodeViewContent className="min-h-[2rem] w-full" />
      </div>
    </NodeViewWrapper>
  );
};

// "use client";

// import React from "react";
// import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

// const colorMap: Record<string, string> = {
//   white: "#ffffff",
//   gray: "#f4f4f5",
//   blue: "#eff6ff",
//   green: "#f0fdf4",
//   yellow: "#fefce8",
//   red: "#fef2f2",
//   purple: "#faf5ff",
//   transparent: "transparent",
// };

// export const ColumnView = ({ node }: NodeViewProps) => {
//   const { width, backgroundColor, borderColor, borderWidth } = node.attrs;

//   return (
//     <NodeViewWrapper
//       className="column"
//       style={{
//         width: `${width}%`,
//         flexBasis: `${width}%`,
//         backgroundColor: colorMap[backgroundColor] || "transparent",
//         borderColor: colorMap[borderColor] || "transparent",
//         borderWidth: borderWidth || "1px",
//         borderStyle: "solid",
//         padding: "1rem",
//         borderRadius: "0.75rem",
//         boxSizing: "border-box",
//       }}
//     >
//       <NodeViewContent className="column-content" />
//     </NodeViewWrapper>
//   );
// };
