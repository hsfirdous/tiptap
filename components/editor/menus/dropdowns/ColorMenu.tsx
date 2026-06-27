"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const TEXT_COLORS = [
  { label: "Default", color: "inherit" },
  { label: "Gray", color: "#787774" },
  { label: "Brown", color: "#9f6b53" },
  { label: "Orange", color: "#d9730d" },
  { label: "Yellow", color: "#cb912f" },
  { label: "Green", color: "#448361" },
  { label: "Blue", color: "#337ea9" },
  { label: "Purple", color: "#9065b0" },
  { label: "Pink", color: "#c14c8a" },
  { label: "Red", color: "#d44c47" },
];

export const BG_COLORS = [
  { label: "Default", color: "transparent" },
  { label: "Gray", color: "#f1f1ef" },
  { label: "Brown", color: "#f4eeee" },
  { label: "Orange", color: "#fbefe3" },
  { label: "Yellow", color: "#fbf3db" },
  { label: "Green", color: "#edf3ec" },
  { label: "Blue", color: "#e7f3f8" },
  { label: "Purple", color: "#f4f0f7" },
  { label: "Pink", color: "#f9f0f5" },
  { label: "Red", color: "#fdebec" },
];

interface ColorMenuProps {
  onSelectText: (color: string) => void;
  onSelectBg: (color: string) => void;
}

export const ColorMenu = ({ onSelectText, onSelectBg }: ColorMenuProps) => {
  return (
    <div className="flex flex-col w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        Color
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        {TEXT_COLORS.map((c) => (
          <button
            key={c.label}
            onClick={() => onSelectText(c.color)}
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <div
              className="w-4 h-4 rounded border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[10px]"
              style={{
                color: c.color === "inherit" ? "currentColor" : c.color,
              }}
            >
              A
            </div>
            {c.label}
          </button>
        ))}
      </div>

      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />

      <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        Background
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        {BG_COLORS.map((c) => (
          <button
            key={c.label}
            onClick={() => onSelectBg(c.color)}
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <div
              className="w-4 h-4 rounded border border-zinc-200 dark:border-zinc-700"
              style={{ backgroundColor: c.color }}
            />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};
