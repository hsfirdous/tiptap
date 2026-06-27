"use client";

import React, { useEffect, useState } from "react";
import { ToolbarMode } from "@/types/editor";
import { Layout, PanelsTopLeft, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const EditorSettings = () => {
  const [mode, setMode] = useState<ToolbarMode>("notion");

  useEffect(() => {
    const savedMode = localStorage.getItem(
      "editor-toolbar-mode",
    ) as ToolbarMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const handleModeChange = (newMode: ToolbarMode) => {
    setMode(newMode);
    localStorage.setItem("editor-toolbar-mode", newMode);
    // Dispatch custom event to notify editor components
    window.dispatchEvent(new Event("editor-toolbar-mode-changed"));
  };

  return (
    <div className="p-6 max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 size={20} className="text-zinc-500" />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Editor Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 block">
            Toolbar Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleModeChange("notion")}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                mode === "notion"
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                  : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              <PanelsTopLeft
                className={cn(
                  "w-6 h-6",
                  mode === "notion" ? "text-blue-500" : "text-zinc-400",
                )}
              />
              <div>
                <div className="text-sm font-semibold dark:text-zinc-200">
                  Notion Mode
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-1">
                  Floating menus and slash commands for a minimal writing
                  experience.
                </div>
              </div>
            </button>

            <button
              onClick={() => handleModeChange("ribbon")}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                mode === "ribbon"
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                  : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700",
              )}
            >
              <Layout
                className={cn(
                  "w-6 h-6",
                  mode === "ribbon" ? "text-blue-500" : "text-zinc-400",
                )}
              />
              <div>
                <div className="text-sm font-semibold dark:text-zinc-200">
                  Ribbon Mode
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-1">
                  Classical top ribbon toolbar with tabs, inspired by Word and
                  Google Docs.
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] text-zinc-400 text-center uppercase tracking-widest font-medium">
          Settings are saved automatically
        </p>
      </div>
    </div>
  );
};
