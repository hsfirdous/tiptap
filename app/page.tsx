"use client";

import React, { useState } from "react";
import { Editor } from "@/components/editor/core/Editor";
import { EditorSettings } from "@/components/editor/settings/EditorSettings";
import { Settings } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState(
    "<p>Try typing <strong>/</strong> to see commands, or select text for the bubble menu.</p>",
  );
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main className="min-h-screen bg-white py-24 dark:bg-zinc-950 transition-colors duration-500 relative">
      <div className="fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-lg hover:scale-110 active:scale-95 transition-all text-zinc-600 dark:text-zinc-400"
        >
          <Settings size={20} />
        </button>

        {showSettings && (
          <div className="absolute right-0 mt-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setShowSettings(false)}
            />
            <EditorSettings />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <Editor
          initialContent={content}
          onUpdate={setContent}
          className="min-h-[70vh]"
        />
      </div>
    </main>
  );
}
