"use client";

import { useState } from "react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon,
  ChevronDown,
  Highlighter,
  Palette,
  Superscript,
  Subscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ColorMenu } from "../dropdowns/ColorMenu";
import { TurnIntoMenu } from "../floatingMenus/TurnIntoMenu";
import { BlockMenu } from "../floatingMenus/BlockMenu";
import { LinkEdit } from "../dropdowns/LinkEdit";
import * as FontCommands from "@/components/editor/commands/font";
import * as ColorCommands from "@/components/editor/commands/color";
import * as FormatCommands from "@/components/editor/commands/formatting";

export const BubbleMenu = ({ editor }: { editor: any }) => {
  const [activeMenu, setActiveMenu] = useState<
    "none" | "color" | "turnInto" | "block" | "link"
  >("none");

  if (!editor) return null;

  return (
    <TiptapBubbleMenu
      editor={editor}
      // @ts-ignore
      tippyOptions={{
        duration: 100,
        maxWidth: "none",
        onHidden: () => setActiveMenu("none"),
        interactive: true,
        trigger: "manual",
        placement: "top",
      }}
      className="flex flex-col overflow-visible rounded-xl border border-zinc-200 bg-white p-1 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 min-w-[300px] z-50"
    >
      {activeMenu === "link" && (
        <div className="absolute bottom-full left-0 mb-2 w-full">
          <LinkEdit
            initialUrl={editor.getAttributes("link").href}
            onSave={(url) => {
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              } else {
                editor.chain().focus().unsetLink().run();
              }
              setActiveMenu("none");
            }}
            onCancel={() => setActiveMenu("none")}
          />
        </div>
      )}
      {/* Row 1: Advanced Formatting */}
      <div className="flex items-center gap-0.5 border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-1">
        <button
          onClick={() => FormatCommands.toggleSuperscript(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("superscript")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Superscript size={14} />
        </button>
        <button
          onClick={() => FormatCommands.toggleSubscript(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("subscript")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Subscript size={14} />
        </button>

        <div className="w-px h-4 bg-zinc-100 dark:bg-zinc-800 mx-1" />

        <button
          onClick={() => FormatCommands.setTextAlign(editor, "left")}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive({ textAlign: "left" })
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <AlignLeft size={14} />
        </button>
        <button
          onClick={() => FormatCommands.setTextAlign(editor, "center")}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive({ textAlign: "center" })
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <AlignCenter size={14} />
        </button>
        <button
          onClick={() => FormatCommands.setTextAlign(editor, "right")}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive({ textAlign: "right" })
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <AlignRight size={14} />
        </button>
        <button
          onClick={() => FormatCommands.setTextAlign(editor, "justify")}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive({ textAlign: "justify" })
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <AlignJustify size={14} />
        </button>

        <div className="w-px h-4 bg-zinc-100 dark:bg-zinc-800 mx-1" />

        <button
          onClick={() => FormatCommands.toggleBulletList(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("bulletList")
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <List size={14} />
        </button>
        <button
          onClick={() => FormatCommands.toggleOrderedList(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("orderedList")
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <ListOrdered size={14} />
        </button>
      </div>

      {/* Row 2: Standard Formatting */}
      <div className="flex items-center gap-0.5 relative">
        <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-colors mr-1">
          <Sparkles size={14} />
          Improve
        </button>

        <div className="w-px h-4 bg-zinc-100 dark:bg-zinc-800 mx-1" />

        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "turnInto" ? "none" : "turnInto")
            }
            className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Text <ChevronDown size={12} />
          </button>
          {activeMenu === "turnInto" && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <TurnIntoMenu
                editor={editor}
                onSelect={() => setActiveMenu("none")}
              />
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-zinc-100 dark:bg-zinc-800 mx-1" />

        <button
          onClick={() => FormatCommands.toggleBold(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("bold")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => FormatCommands.toggleItalic(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("italic")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => FormatCommands.toggleUnderline(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("underline")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() => FormatCommands.toggleStrike(editor)}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("strike")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Strikethrough size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("code")
              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <Code size={16} />
        </button>

        <button
          onClick={() => setActiveMenu(activeMenu === "link" ? "none" : "link")}
          className={cn(
            "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
            editor.isActive("link")
              ? "text-blue-500"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          <LinkIcon size={16} />
        </button>

        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "color" ? "none" : "color")
            }
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              editor.isActive("textStyle") || editor.isActive("highlight")
                ? "text-blue-500"
                : "text-zinc-600 dark:text-zinc-400",
            )}
          >
            <Palette size={16} />
          </button>
          {activeMenu === "color" && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <ColorMenu
                onSelectText={(color) => {
                  ColorCommands.setTextColor(editor, color);
                  setActiveMenu("none");
                }}
                onSelectBg={(color) => {
                  ColorCommands.setHighlightColor(editor, color);
                  setActiveMenu("none");
                }}
              />
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-zinc-100 dark:bg-zinc-800 mx-1" />

        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "block" ? "none" : "block")
            }
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          {activeMenu === "block" && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <BlockMenu
                editor={editor}
                onClose={() => setActiveMenu("none")}
              />
            </div>
          )}
        </div>
      </div>
    </TiptapBubbleMenu>
  );
};
