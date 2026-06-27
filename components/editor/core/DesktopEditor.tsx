"use client";

import React, { useState, useEffect } from "react";
import { EditorContent, Editor } from "@tiptap/react";
import { NotionToolbar } from "../toolbars/NotionToolbar";
import { RibbonToolbar } from "../toolbars/RibbonToolbar";
import { ToolbarMode } from "@/types/editor";
import { cn } from "@/lib/utils";

interface DesktopEditorProps {
  editor: Editor;
  className?: string;
}

export const DesktopEditor = ({ editor, className }: DesktopEditorProps) => {
  const [toolbarMode, setToolbarMode] = useState<ToolbarMode>("notion");

  useEffect(() => {
    const savedMode = localStorage.getItem(
      "editor-toolbar-mode",
    ) as ToolbarMode;
    if (savedMode) {
      setToolbarMode(savedMode);
    }

    const handleModeChange = () => {
      const newMode = localStorage.getItem(
        "editor-toolbar-mode",
      ) as ToolbarMode;
      if (newMode) setToolbarMode(newMode);
    };

    window.addEventListener("editor-toolbar-mode-changed", handleModeChange);
    return () =>
      window.removeEventListener(
        "editor-toolbar-mode-changed",
        handleModeChange,
      );
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full w-full bg-white dark:bg-zinc-950",
        className,
      )}
    >
      {toolbarMode === "ribbon" && <RibbonToolbar editor={editor} />}

      <div
        className={cn(
          "relative w-full max-w-4xl mx-auto px-12 group/editor pb-24 flex-1 overflow-y-auto",
          toolbarMode === "ribbon" ? "pt-8" : "pt-0",
        )}
      >
        {toolbarMode === "notion" && <NotionToolbar editor={editor} />}

        <EditorContent editor={editor} />

        <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-4 text-[11px] font-medium uppercase tracking-widest text-zinc-400 dark:border-zinc-800">
          <div className="flex gap-4">
            <span>{editor.storage.characterCount.characters()} Characters</span>
            <span>{editor.storage.characterCount.words()} Words</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-tighter text-[9px]">
              {toolbarMode} Mode
            </span>
            <span>Production Ready Editor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
