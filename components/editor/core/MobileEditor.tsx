"use client";

import React, { useState, useEffect } from "react";
import { EditorContent, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Heading2,
  List,
  CheckSquare,
  Image as ImageIcon,
  MoreHorizontal,
  Type,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TEXT_COLORS, BG_COLORS } from "../menus/dropdowns/ColorMenu";
import { LinkEdit } from "../menus/dropdowns/LinkEdit";
import { RibbonToolbar } from "../toolbars/RibbonToolbar";
import { ToolbarMode } from "@/types/editor";

interface MobileEditorProps {
  editor: Editor;
  className?: string;
}

export const MobileEditor = ({ editor, className }: MobileEditorProps) => {
  const [toolbarMode, setToolbarMode] = useState<ToolbarMode>("notion");
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "main" | "color" | "bg" | "align" | "link" | "image"
  >("main");

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

  const handleLinkSave = (url: string) => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setActiveTab("main");
    setShowMore(false);
  };

  const handleImageSave = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setActiveTab("main");
    setShowMore(false);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full bg-white dark:bg-zinc-950",
        className,
      )}
    >
      {toolbarMode === "ribbon" && <RibbonToolbar editor={editor} />}

      {/* Editor Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <EditorContent editor={editor} />
      </div>

      {/* Bottom Fixed Toolbar (Only in Notion Mode) */}
      {toolbarMode === "notion" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          {showMore && (
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  {activeTab === "main" && "More Options"}
                  {activeTab === "color" && "Text Color"}
                  {activeTab === "bg" && "Background Color"}
                  {activeTab === "align" && "Alignment"}
                  {activeTab === "link" && "Insert Link"}
                  {activeTab === "image" && "Insert Image"}
                </h3>
                <button
                  onClick={() => {
                    if (activeTab !== "main") setActiveTab("main");
                    else setShowMore(false);
                  }}
                  className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X size={20} />
                </button>
              </div>

              {activeTab === "main" && (
                <div className="grid grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab("color")}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <Type size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500">Color</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("bg")}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <Highlighter size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500">Highlight</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("align")}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <AlignCenter size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500">Align</span>
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleCode().run();
                      setShowMore(false);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1",
                      editor.isActive("code") && "text-blue-500",
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800",
                        editor.isActive("code") &&
                          "bg-blue-50 dark:bg-blue-900/30",
                      )}
                    >
                      <Code size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500">Code</span>
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleBlockquote().run();
                      setShowMore(false);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1",
                      editor.isActive("blockquote") && "text-blue-500",
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800",
                        editor.isActive("blockquote") &&
                          "bg-blue-50 dark:bg-blue-900/30",
                      )}
                    >
                      <Quote size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500">Quote</span>
                  </button>
                </div>
              )}

              {activeTab === "color" && (
                <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => {
                        editor.chain().focus().setColor(c.color).run();
                        setShowMore(false);
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm font-bold"
                        style={{
                          color:
                            c.color === "inherit" ? "currentColor" : c.color,
                        }}
                      >
                        A
                      </div>
                      <span className="text-[10px] text-zinc-500 truncate w-full text-center">
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "bg" && (
                <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                  {BG_COLORS.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .setHighlight({ color: c.color })
                          .run();
                        setShowMore(false);
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-[10px] text-zinc-500 truncate w-full text-center">
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "align" && (
                <div className="flex justify-around py-4">
                  <button
                    onClick={() => {
                      editor.chain().focus().setTextAlign("left").run();
                      setShowMore(false);
                    }}
                    className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                  >
                    <AlignLeft size={24} />
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().setTextAlign("center").run();
                      setShowMore(false);
                    }}
                    className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                  >
                    <AlignCenter size={24} />
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().setTextAlign("right").run();
                      setShowMore(false);
                    }}
                    className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                  >
                    <AlignRight size={24} />
                  </button>
                </div>
              )}

              {activeTab === "link" && (
                <LinkEdit
                  initialUrl={editor.getAttributes("link").href}
                  onSave={handleLinkSave}
                  onCancel={() => setActiveTab("main")}
                />
              )}

              {activeTab === "image" && (
                <LinkEdit
                  onSave={handleImageSave}
                  onCancel={() => setActiveTab("main")}
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-around h-14 px-2">
            <ToolbarButton
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
              icon={<Bold size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              icon={<Italic size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              icon={<UnderlineIcon size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("link")}
              onClick={() => {
                setShowMore(true);
                setActiveTab("link");
              }}
              icon={<LinkIcon size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              icon={<Heading2 size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              icon={<List size={20} />}
            />
            <ToolbarButton
              active={editor.isActive("taskList")}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              icon={<CheckSquare size={20} />}
            />
            <ToolbarButton
              onClick={() => {
                setShowMore(true);
                setActiveTab("image");
              }}
              icon={<ImageIcon size={20} />}
            />
            <ToolbarButton
              active={showMore && activeTab === "main"}
              onClick={() => {
                setShowMore(!showMore);
                setActiveTab("main");
              }}
              icon={<MoreHorizontal size={20} />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ToolbarButton = ({
  active,
  onClick,
  icon,
}: {
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 w-11 h-11 flex items-center justify-center rounded-lg transition-colors active:scale-95",
      active
        ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
    )}
  >
    {icon}
  </button>
);
