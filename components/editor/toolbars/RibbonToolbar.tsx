"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { RibbonTabs, TabType } from "./RibbonTabs";
import { HomeTab } from "./HomeTab";
import { InsertTab } from "./InsertTab";
import { TableTab } from "./TableTab";
import { LayoutTab } from "./LayoutTab";
import { ViewTab } from "./ViewTab";

interface RibbonToolbarProps {
  editor: Editor;
  className?: string;
}

export const RibbonToolbar = ({ editor, className }: RibbonToolbarProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Use a state to force update the toolbar on selection changes or updates
  // This ensures isActive() and can() calls are always fresh
  const [, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
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

  const isInTable = useMemo(() => {
    if (!editor) return false;
    return editor.isActive("table");
  }, [editor, editor?.state.selection]); // selection change might not be enough, use tick or editor object

  // Update tick also works if we use it in useMemo
  const memoizedIsInTable = editor?.isActive("table") || false;

  useEffect(() => {
    if (memoizedIsInTable && activeTab !== "table") {
      // Don't auto-switch, but could if desired
    } else if (!memoizedIsInTable && activeTab === "table") {
      setActiveTab("home");
    }
  }, [memoizedIsInTable, activeTab]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex flex-col shadow-sm select-none z-40 transition-all duration-200",
        className,
      )}
    >
      <RibbonTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isInTable={memoizedIsInTable}
        editor={editor}
      />

      <div className="h-24 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center h-full px-2">
          {activeTab === "home" && <HomeTab editor={editor} />}
          {activeTab === "insert" && <InsertTab editor={editor} />}
          {activeTab === "table" && <TableTab editor={editor} />}
          {activeTab === "layout" && <LayoutTab editor={editor} />}
          {activeTab === "view" && <ViewTab editor={editor} />}
        </div>
      </div>
    </div>
  );
};

export default RibbonToolbar;
