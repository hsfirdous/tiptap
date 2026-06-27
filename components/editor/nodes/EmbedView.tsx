"use client";

import React, { useMemo, useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { X as XIcon, Code, FileText, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const EmbedView = (props: NodeViewProps) => {
  const { node, updateAttributes } = props;
  const { url } = node.attrs;
  const [tempUrl, setTempUrl] = useState(url || "");

  const embedInfo = useMemo(() => {
    if (!url) return null;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.includes("v=")
        ? url.split("v=")[1].split("&")[0]
        : url.split("/").pop();
      return {
        type: "youtube",
        src: `https://www.youtube.com/embed/${id}`,
        icon: Play,
        color: "text-red-600",
        label: "YouTube",
      };
    }

    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop();
      return {
        type: "vimeo",
        src: `https://player.vimeo.com/video/${id}`,
        icon: Play,
        color: "text-blue-400",
        label: "Vimeo",
      };
    }

    if (url.includes("twitter.com") || url.includes("x.com")) {
      return {
        type: "twitter",
        src: `https://twitframe.com/show?url=${encodeURIComponent(url)}`,
        icon: XIcon,
        color: "text-sky-500",
        label: "Twitter",
      };
    }

    if (url.includes("codepen.io")) {
      const parts = url.split("/");
      const user = parts[3];
      const slug = parts[5];
      return {
        type: "codepen",
        src: `https://codepen.io/${user}/embed/${slug}?default-tab=result`,
        icon: Code,
        color: "text-zinc-900",
        label: "CodePen",
      };
    }

    if (url.includes("gist.github.com")) {
      return {
        type: "gist",
        src: null,
        icon: FileText,
        color: "text-zinc-800",
        label: "GitHub Gist",
      };
    }

    return null;
  }, [url]);

  const handleUrlSubmit = () => {
    if (tempUrl) updateAttributes({ url: tempUrl });
  };

  if (!url) {
    return (
      <NodeViewWrapper className="my-8 p-6 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 text-zinc-400">
          <Play size={24} />
          <span className="text-sm font-medium">Insert Embed</span>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <input
            autoFocus
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
            className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            placeholder="Paste YouTube, Vimeo, Twitter, CodePen, or Gist link..."
          />
          <button
            onClick={handleUrlSubmit}
            className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-md transition-colors hover:bg-zinc-800 dark:hover:bg-white"
          >
            Embed
          </button>
        </div>
        <p className="text-[10px] text-zinc-400">
          Supports YouTube, Vimeo, Twitter, CodePen, and Gist
        </p>
      </NodeViewWrapper>
    );
  }

  if (!embedInfo) {
    return (
      <NodeViewWrapper className="my-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3">
        <Play size={20} className="text-zinc-400" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Unknown Embed</span>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline truncate max-w-md"
            >
              {url}
            </a>
            <button
              onClick={() => updateAttributes({ url: "" })}
              className="text-[10px] text-zinc-400 hover:text-red-500"
            >
              Edit
            </button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-8 group/embed relative">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <embedInfo.icon size={14} className={embedInfo.color} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {embedInfo.label}
          </span>
        </div>
        <button
          onClick={() => updateAttributes({ url: "" })}
          className="text-[10px] text-zinc-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Edit URL
        </button>
      </div>

      {embedInfo.src ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg bg-black">
          <iframe
            src={embedInfo.src}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800",
              embedInfo.color,
            )}
          >
            <embedInfo.icon size={24} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold">{embedInfo.label}</span>
            <span className="text-xs text-zinc-500 truncate">{url}</span>
          </div>
        </a>
      )}
    </NodeViewWrapper>
  );
};
