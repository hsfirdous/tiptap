"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Smile,
  MoreHorizontal,
  ChevronRight,
  Home,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PageHeader = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [pageIcon, setPageIcon] = useState<string | null>("📝");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [showIconInput, setShowIconInput] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  const [tempIcon, setTempIcon] = useState("");

  const handleCoverSubmit = () => {
    if (tempUrl) setCoverImage(tempUrl);
    setShowCoverInput(false);
    setTempUrl("");
  };

  const handleIconSubmit = () => {
    if (tempIcon) setPageIcon(tempIcon);
    setShowIconInput(false);
    setTempIcon("");
  };

  return (
    <div className="relative mb-12 group/header">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8 text-sm text-zinc-400">
        <Home size={14} />
        <ChevronRight size={12} />
        <span className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors">
          Workspace
        </span>
        <ChevronRight size={12} />
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          Current Page
        </span>
      </div>

      {/* Cover Image */}
      <div
        className={cn(
          "relative w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 transition-all duration-300",
          !coverImage && "h-0 opacity-0 mb-0",
        )}
      >
        {coverImage && (
          <>
            <img
              src={coverImage}
              className="w-full h-full object-cover"
              alt="Cover"
            />
            <button
              onClick={() => setShowCoverInput(true)}
              className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover/header:opacity-100 transition-opacity"
            >
              Change cover
            </button>
          </>
        )}
      </div>

      {/* Inputs */}
      {showCoverInput && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-md z-30 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <input
              autoFocus
              type="text"
              placeholder="Paste cover image URL..."
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCoverSubmit()}
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <button
              onClick={handleCoverSubmit}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-blue-500"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => setShowCoverInput(false)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {showIconInput && (
        <div className="absolute top-48 left-0 z-30 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <input
              autoFocus
              type="text"
              placeholder="Emoji..."
              value={tempIcon}
              onChange={(e) => setTempIcon(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleIconSubmit()}
              className="w-20 bg-transparent border-none outline-none text-center text-xl"
              maxLength={2}
            />
            <button
              onClick={handleIconSubmit}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-blue-500"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Page Icon & Actions */}
      <div className="relative flex flex-col mt-4">
        {pageIcon ? (
          <div
            className={cn(
              "text-6xl md:text-8xl select-none mb-4 w-fit group/icon relative",
              coverImage &&
                "-mt-16 md:-mt-24 bg-white dark:bg-zinc-950 p-2 rounded-3xl",
            )}
          >
            <span
              className="cursor-pointer"
              onClick={() => setShowIconInput(true)}
            >
              {pageIcon}
            </span>
            <button
              onClick={() => setPageIcon(null)}
              className="absolute -top-2 -right-2 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity shadow-sm"
            >
              <Smile size={12} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-4 opacity-0 group-hover/header:opacity-100 transition-opacity">
            <button
              onClick={() => setShowIconInput(true)}
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-400"
            >
              <Smile size={14} />
              Add icon
            </button>
            {!coverImage && (
              <button
                onClick={() => setShowCoverInput(true)}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-400"
              >
                <ImageIcon size={14} />
                Add cover
              </button>
            )}
          </div>
        )}

        <h1
          className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none empty:before:content-['Untitled'] empty:before:text-zinc-200 dark:empty:before:text-zinc-800"
          contentEditable
          suppressContentEditableWarning
        >
          Upgrade Tiptap Editor
        </h1>
      </div>
    </div>
  );
};
