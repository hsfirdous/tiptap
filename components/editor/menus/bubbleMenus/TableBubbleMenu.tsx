"use client";

import { useState } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  Plus,
  Trash2,
  Table as TableIcon,
  Columns,
  Rows,
  Merge,
  Split,
  Layout,
  Type,
  Baseline,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ArrowUp,
  ArrowDown,
  Menu,
  Bold,
  Italic,
  Underline,
  Square,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TEXT_COLORS, BG_COLORS } from "../dropdowns/ColorMenu";

export const TableBubbleMenu = ({ editor }: { editor: any }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  if (!editor) return null;

  const shouldShow = ({ editor }: { editor: any }) => {
    return editor.isActive("table");
  };

  const setCellAttribute = (name: string, value: any) => {
    editor.chain().focus().setCellAttribute(name, value).run();
  };

  const toggleTableAttribute = (name: string) => {
    const attrs = editor.getAttributes("table");
    editor
      .chain()
      .focus()
      .updateAttributes("table", { [name]: !attrs[name] })
      .run();
  };

  const BORDER_WIDTHS = ["1px", "2px", "3px", "4px"];
  const BORDER_STYLES = ["solid", "dashed", "dotted", "double"];
  const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px"];

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      // @ts-ignore
      tippyOptions={{
        duration: 100,
        placement: "bottom",
        interactive: true,
        onHide: () => setActiveMenu(null),
      }}
      className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 z-50"
    >
      <div className="flex items-center gap-0.5 p-1 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        {/* Row Operations */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Add Row Above"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
            title="Delete Row"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Column Operations */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Add Column Left"
          >
            <div className="flex items-center">
              <Plus size={10} />
              <Columns size={12} />
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
            title="Delete Column"
          >
            <Trash2 size={14} className="rotate-90" />
          </button>
        </div>

        {/* Merge/Split */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => editor.chain().focus().mergeCells().run()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Merge Cells"
          >
            <Merge size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().splitCell().run()}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Split Cell"
          >
            <Split size={14} />
          </button>
        </div>

        {/* Table Config */}
        <div className="flex items-center gap-0.5 px-1">
          <button
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            className={cn(
              "p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 transition-colors",
              editor.isActive("table", { withHeaderRow: true })
                ? "text-blue-500"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Toggle Header Row"
          >
            <Layout size={14} />
          </button>
          <button
            onClick={() => toggleTableAttribute("stickyHeader")}
            className={cn(
              "p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 transition-colors",
              editor.getAttributes("table").stickyHeader
                ? "text-blue-500"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Sticky Header"
          >
            <ArrowUp size={14} />
          </button>
          <button
            onClick={() => toggleTableAttribute("stickyColumn")}
            className={cn(
              "p-1.5 rounded hover:bg-white dark:hover:bg-zinc-800 transition-colors",
              editor.getAttributes("table").stickyColumn
                ? "text-blue-500"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Sticky Column"
          >
            <AlignLeft size={14} className="border-l border-zinc-400" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-0.5 p-1 overflow-x-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl no-scrollbar">
        {/* Text Style */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              editor.isActive("bold")
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
          >
            <Bold size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              editor.isActive("italic")
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
          >
            <Italic size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              editor.isActive("underline")
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
          >
            <Underline size={14} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setCellAttribute("textAlign", "left")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Align Left"
          >
            <AlignLeft size={14} />
          </button>
          <button
            onClick={() => setCellAttribute("textAlign", "center")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Align Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            onClick={() => setCellAttribute("textAlign", "right")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            title="Align Right"
          >
            <AlignRight size={14} />
          </button>
          <button
            onClick={() => setCellAttribute("verticalAlign", "top")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-t border-zinc-400"
            title="Align Top"
          >
            <ArrowUp size={12} />
          </button>
          <button
            onClick={() => setCellAttribute("verticalAlign", "middle")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-y border-zinc-400"
            title="Align Middle"
          >
            <Menu size={12} />
          </button>
          <button
            onClick={() => setCellAttribute("verticalAlign", "bottom")}
            className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-b border-zinc-400"
            title="Align Bottom"
          >
            <ArrowDown size={12} />
          </button>
        </div>

        {/* Colors & Styling */}
        <div className="flex items-center gap-0.5 px-1">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "textColor" ? null : "textColor")
            }
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              activeMenu === "textColor"
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Text Color"
          >
            <Type size={14} />
          </button>
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "bgColor" ? null : "bgColor")
            }
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              activeMenu === "bgColor"
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Background Color"
          >
            <Baseline size={14} />
          </button>
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "borderColor" ? null : "borderColor")
            }
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              activeMenu === "borderColor"
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Border Style"
          >
            <Square size={14} />
          </button>
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "fontSize" ? null : "fontSize")
            }
            className={cn(
              "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              activeMenu === "fontSize"
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-zinc-600 dark:text-zinc-400",
            )}
            title="Font Size"
          >
            <Type size={14} className="scale-75" />
          </button>
        </div>
      </div>

      {/* Sub-menus */}
      {activeMenu === "fontSize" && (
        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-wrap gap-1">
          {FONT_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setCellAttribute("fontSize", s);
                setActiveMenu(null);
              }}
              className="px-2 py-0.5 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {activeMenu === "textColor" && (
        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 grid grid-cols-5 gap-1">
          {TEXT_COLORS.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setCellAttribute("textColor", c.color);
                setActiveMenu(null);
              }}
              className="w-6 h-6 rounded border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[10px] hover:scale-110 transition-transform"
              style={{
                color: c.color === "inherit" ? "currentColor" : c.color,
              }}
              title={c.label}
            >
              A
            </button>
          ))}
        </div>
      )}

      {activeMenu === "bgColor" && (
        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 grid grid-cols-5 gap-1">
          {BG_COLORS.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setCellAttribute("backgroundColor", c.color);
                setActiveMenu(null);
              }}
              className="w-6 h-6 rounded border border-zinc-200 dark:border-zinc-700 hover:scale-110 transition-transform"
              style={{ backgroundColor: c.color }}
              title={c.label}
            />
          ))}
        </div>
      )}

      {activeMenu === "borderColor" && (
        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {TEXT_COLORS.map((c) => (
              <button
                key={c.label}
                onClick={() => setCellAttribute("borderColor", c.color)}
                className="w-6 h-6 rounded border border-zinc-200 dark:border-zinc-700 hover:scale-110 transition-transform"
                style={{
                  backgroundColor:
                    c.color === "inherit" ? "transparent" : c.color,
                }}
                title={`Border Color: ${c.label}`}
              />
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              Width
            </span>
            {BORDER_WIDTHS.map((w) => (
              <button
                key={w}
                onClick={() => setCellAttribute("borderWidth", w)}
                className="px-2 py-0.5 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                {w}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              Style
            </span>
            {BORDER_STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setCellAttribute("borderStyle", s)}
                className="px-2 py-0.5 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </BubbleMenu>
  );
};
