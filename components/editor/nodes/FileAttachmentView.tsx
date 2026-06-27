"use client";

import React, { useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { File, Download, Trash2, Upload } from "lucide-react";

export const FileAttachmentView = (props: NodeViewProps) => {
  const { node, updateAttributes, editor, getPos } = props;
  const { name, size, url } = node.attrs;
  const [tempUrl, setTempUrl] = useState(url || "");

  const handleUrlSubmit = () => {
    if (tempUrl) {
      updateAttributes({
        url: tempUrl,
        name: tempUrl.split("/").pop() || "Document.pdf",
      });
    }
  };

  const deleteFile = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;
    editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
  };

  if (!url) {
    return (
      <NodeViewWrapper className="my-8 p-6 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 text-zinc-400">
          <Upload size={24} />
          <span className="text-sm font-medium">Add File Attachment</span>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <input
            autoFocus
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
            className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            placeholder="Paste file URL..."
          />
          <button
            onClick={handleUrlSubmit}
            className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-md transition-colors hover:bg-zinc-800 dark:hover:bg-white"
          >
            Add
          </button>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-4 group/file relative">
      <div className="flex items-center gap-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
          <File size={20} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {name}
          </span>
          <span className="text-xs text-zinc-500">{size}</span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={url}
            download
            className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <Download size={16} />
          </a>
          <button
            onClick={() => updateAttributes({ url: "" })}
            className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-blue-500 transition-colors"
            title="Edit URL"
          >
            <Upload size={16} />
          </button>
          <button
            onClick={deleteFile}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover/file:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
