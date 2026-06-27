"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Undo, Redo } from "lucide-react";
import { Editor } from "@tiptap/react";

export type TabType = "home" | "insert" | "table" | "layout" | "view";

interface RibbonTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isInTable: boolean;
  editor: Editor;
}

export const RibbonTabs = React.memo(
  ({ activeTab, onTabChange, isInTable, editor }: RibbonTabsProps) => {
    // Local state to force re-render on editor changes
    const [, setTick] = useState(0);
    const forceUpdate = React.useCallback(() => setTick((t) => t + 1), []);

    React.useEffect(() => {
      if (!editor) return;

      editor.on("selectionUpdate", forceUpdate);
      editor.on("transaction", forceUpdate);
      editor.on("update", forceUpdate);

      return () => {
        editor.off("selectionUpdate", forceUpdate);
        editor.off("transaction", forceUpdate);
        editor.off("update", forceUpdate);
      };
    }, [editor, forceUpdate]);

    const tabs: { id: TabType; label: string; hidden?: boolean }[] = [
      { id: "home", label: "Home" },
      { id: "insert", label: "Insert" },
      { id: "table", label: "Table", hidden: !isInTable },
      { id: "layout", label: "Layout" },
      { id: "view", label: "View" },
    ];

    return (
      <div className="flex items-center px-4 h-9 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1 h-full">
          {tabs.map(
            (tab) =>
              !tab.hidden && (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "px-4 h-full text-xs font-semibold transition-all relative outline-none",
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50",
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-t-full" />
                  )}
                </button>
              ),
          )}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-30 text-zinc-600 dark:text-zinc-400 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-30 text-zinc-600 dark:text-zinc-400 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo size={14} />
          </button>
        </div>
      </div>
    );
  },
);

RibbonTabs.displayName = "RibbonTabs";
