"use client";

import React from "react";
import { Save, Download, FileJson, FileCode, Undo, Redo } from "lucide-react";
import { Editor } from "@tiptap/react";

export const Toolbar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  const saveContent = () => {
    const json = editor.getJSON();
    console.log("Saved JSON:", json);
    alert("Content logged to console as JSON");
  };

  const exportHtml = () => {
    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.html";
    a.click();
  };

  const exportJson = () => {
    const json = JSON.stringify(editor.getJSON(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.json";
    a.click();
  };

  return (
    <div className="sticky top-0 z-30 mb-8 flex items-center justify-between border-b border-zinc-100 bg-white/80 py-2 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
        >
          <Redo size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={saveContent}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
        >
          <Save size={14} />
          Save
        </button>

        <div className="flex items-center gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
          <button
            onClick={exportJson}
            title="Export as JSON"
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <FileJson size={14} />
          </button>
          <button
            onClick={exportHtml}
            title="Export as HTML"
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <FileCode size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
