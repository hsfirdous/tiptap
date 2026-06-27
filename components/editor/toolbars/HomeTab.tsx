"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Type,
  Highlighter,
  Copy,
  Scissors,
  ClipboardPaste,
  MessageSquare,
  Code2,
  Superscript,
  Subscript,
  Indent,
  Outdent,
  Baseline,
  FileText,
} from "lucide-react";
import { RibbonButton } from "./RibbonButton";
import { RibbonGroup } from "./RibbonGroup";
import { TEXT_COLORS, BG_COLORS } from "../menus/dropdowns/ColorMenu";
import { cn } from "@/lib/utils";
import * as FontCommands from "@/components/editor/commands/font";
import * as ColorCommands from "@/components/editor/commands/color";
import * as FormatCommands from "@/components/editor/commands/formatting";

interface HomeTabProps {
  editor: Editor;
}

const FONT_FAMILIES = [
  "Inter",
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Roboto",
  "Poppins",
];

const FONT_SIZES = [
  "8",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "20",
  "24",
  "28",
  "32",
  "36",
  "48",
  "72",
];

const LINE_HEIGHTS = ["1", "1.15", "1.5", "2", "2.5", "3"];

const STYLES = [
  { label: "Normal", value: "paragraph" },
  // { label: "H1", value: "heading1" },
  { label: "H2", value: "heading2" },
  { label: "H3", value: "heading3" },
  { label: "H4", value: "heading4" },
  { label: "H5", value: "heading5" },
  { label: "H6", value: "heading6" },
  { label: "Quote", value: "blockquote" },
  { label: "Code Block", value: "codeBlock" },
  { label: "Callout", value: "callout" },
];

export const HomeTab = React.memo(({ editor }: HomeTabProps) => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showHighlightColor, setShowHighlightColor] = useState(false);

  // Local state to force re-render on editor changes
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

  const currentFontFamily =
    editor.getAttributes("textStyle").fontFamily || "Inter";
  const currentFontSize = (
    editor.getAttributes("textStyle").fontSize || "11px"
  ).replace("px", "");
  const currentLineHeight =
    editor.getAttributes("paragraph").lineHeight ||
    editor.getAttributes("heading").lineHeight ||
    "1.15";

  const highestHierarchy = FormatCommands.getHighestHeadingHierarchy(editor);

  const getCurrentStyle = useCallback(() => {
    // if (editor.isActive("heading", { level: 1 })) return "heading1";
    if (editor.isActive("heading", { level: 2 })) return "heading2";
    if (editor.isActive("heading", { level: 3 })) return "heading3";
    if (editor.isActive("heading", { level: 4 })) return "heading4";
    if (editor.isActive("heading", { level: 5 })) return "heading5";
    if (editor.isActive("heading", { level: 6 })) return "heading6";
    if (editor.isActive("blockquote")) return "blockquote";
    if (editor.isActive("codeBlock")) return "codeBlock";
    if (editor.isActive("callout")) return "callout";
    return "paragraph";
  }, [editor]);

  const handleStyleChange = (value: string) => {
    switch (value) {
      case "paragraph":
        FormatCommands.setParagraph(editor);
        break;
      case "heading2":
        FormatCommands.toggleHeading(editor, 2);
        break;
      case "heading3":
        FormatCommands.toggleHeading(editor, 3);
        break;
      case "heading4":
        FormatCommands.toggleHeading(editor, 4);
        break;
      case "heading5":
        FormatCommands.toggleHeading(editor, 5);
        break;
      case "heading6":
        FormatCommands.toggleHeading(editor, 6);
        break;
      case "blockquote":
        FormatCommands.toggleBlockquote(editor);
        break;
      case "codeBlock":
        FormatCommands.toggleCodeBlock(editor);
        break;
      case "callout":
        FormatCommands.convertToCallout(editor);
        break;
    }
  };

  const currentStyle = getCurrentStyle();

  const currentLevel = () => {
    if (currentStyle === "heading2") return 2;
    if (currentStyle === "heading3") return 3;
    if (currentStyle === "heading4") return 4;
    if (currentStyle === "heading5") return 5;
    if (currentStyle === "heading6") return 6;
    return 0;
  };

  console.log(editor.options.content);

  return (
    <>
      <RibbonGroup label="Clipboard">
        <RibbonButton
          label="Paste"
          large
          icon={<ClipboardPaste />}
          onClick={() => FormatCommands.paste(editor)}
        />
        <div className="flex flex-col gap-0.5">
          <RibbonButton
            icon={<Copy />}
            onClick={() => FormatCommands.copy(editor)}
            title="Copy"
          />
          <RibbonButton
            icon={<Scissors />}
            onClick={() => FormatCommands.cut(editor)}
            title="Cut"
          />
        </div>
      </RibbonGroup>

      <RibbonGroup label="Font">
        <div className="flex flex-col gap-1 mr-2">
          <div className="flex items-center gap-1">
            <select
              className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1 py-0.5 w-24 outline-none font-medium"
              value={
                FONT_FAMILIES.includes(currentFontFamily)
                  ? currentFontFamily
                  : "Inter"
              }
              onChange={(e) =>
                FontCommands.setFontFamily(editor, e.target.value)
              }
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <select
              className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1 py-0.5 w-12 outline-none font-medium"
              value={currentFontSize}
              onChange={(e) => FontCommands.setFontSize(editor, e.target.value)}
            >
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="flex flex-col justify-center ml-2 gap-1">
              <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1 py-0.5">
                <Baseline size={12} className="text-zinc-400" />
                <select
                  className="text-[10px] outline-none font-medium bg-transparent w-10"
                  value={currentLineHeight}
                  onChange={(e) =>
                    FontCommands.setLineHeight(editor, e.target.value)
                  }
                >
                  {LINE_HEIGHTS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <RibbonButton
              active={editor.isActive("bold")}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              onClick={() => FormatCommands.toggleBold(editor)}
              icon={<Bold />}
            />
            <RibbonButton
              active={editor.isActive("italic")}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              onClick={() => FormatCommands.toggleItalic(editor)}
              icon={<Italic />}
            />
            <RibbonButton
              active={editor.isActive("underline")}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              onClick={() => FormatCommands.toggleUnderline(editor)}
              icon={<UnderlineIcon />}
            />
            <RibbonButton
              active={editor.isActive("strike")}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              onClick={() => FormatCommands.toggleStrike(editor)}
              icon={<Strikethrough />}
            />
            <RibbonButton
              active={editor.isActive("superscript")}
              disabled={!editor.can().chain().focus().toggleSuperscript().run()}
              onClick={() => FormatCommands.toggleSuperscript(editor)}
              icon={<Superscript />}
            />
            <RibbonButton
              active={editor.isActive("subscript")}
              disabled={!editor.can().chain().focus().toggleSubscript().run()}
              onClick={() => FormatCommands.toggleSubscript(editor)}
              icon={<Subscript />}
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTextColor(!showTextColor)}
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-200/50 dark:hover:bg-zinc-800 flex flex-col items-center transition-colors",
                  showTextColor && "bg-zinc-200/50 dark:bg-zinc-800",
                )}
              >
                <Type size={16} />
                <div
                  className="h-0.5 w-3 mt-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      editor.getAttributes("textStyle").color || "red",
                  }}
                />
              </button>
              {showTextColor && (
                <div className="absolute left-0 top-full mt-1 z-[100]">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowTextColor(false)}
                  />
                  <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 w-40 animate-in fade-in zoom-in-95 duration-100">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => {
                          ColorCommands.setTextColor(editor, c.color);
                          setShowTextColor(false);
                        }}
                        className={cn(
                          "w-6 h-6 rounded flex items-center justify-center hover:scale-110 active:scale-95 transition-all",
                          editor.getAttributes("textStyle").color === c.color &&
                            "ring-2 ring-blue-500 ring-offset-1",
                        )}
                        style={{
                          color:
                            c.color === "inherit" ? "currentColor" : c.color,
                        }}
                        title={c.label}
                      >
                        A
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHighlightColor(!showHighlightColor)}
                className={cn(
                  "p-1.5 rounded hover:bg-zinc-200/50 dark:hover:bg-zinc-800 flex flex-col items-center transition-colors",
                  showHighlightColor && "bg-zinc-200/50 dark:bg-zinc-800",
                )}
              >
                <Highlighter size={16} />
                <div
                  className="h-0.5 w-3 mt-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      editor.getAttributes("highlight").color || "yellow",
                  }}
                />
              </button>
              {showHighlightColor && (
                <div className="absolute left-0 top-full mt-1 z-[100]">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowHighlightColor(false)}
                  />
                  <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 w-40 animate-in fade-in zoom-in-95 duration-100">
                    {BG_COLORS.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => {
                          ColorCommands.setHighlightColor(editor, c.color);
                          setShowHighlightColor(false);
                        }}
                        className={cn(
                          "w-6 h-6 rounded border border-zinc-100 dark:border-zinc-800 hover:scale-110 active:scale-95 transition-all",
                          editor.getAttributes("highlight").color === c.color &&
                            "ring-2 ring-blue-500 ring-offset-1",
                        )}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </RibbonGroup>

      <RibbonGroup label="Paragraph">
        <div className="grid grid-cols-4 gap-0.5">
          <RibbonButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => FormatCommands.setTextAlign(editor, "left")}
            icon={<AlignLeft />}
            title="Align Left"
          />
          <RibbonButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => FormatCommands.setTextAlign(editor, "center")}
            icon={<AlignCenter />}
            title="Align Center"
          />
          <RibbonButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => FormatCommands.setTextAlign(editor, "right")}
            icon={<AlignRight />}
            title="Align Right"
          />
          <RibbonButton
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => FormatCommands.setTextAlign(editor, "justify")}
            icon={<AlignJustify />}
            title="Justify"
          />
          <RibbonButton
            active={editor.isActive("bulletList")}
            onClick={() => FormatCommands.toggleBulletList(editor)}
            icon={<List />}
            title="Bullet List"
          />
          <RibbonButton
            active={editor.isActive("orderedList")}
            onClick={() => FormatCommands.toggleOrderedList(editor)}
            icon={<ListOrdered />}
            title="Ordered List"
          />
          <RibbonButton
            onClick={() => FormatCommands.indent(editor)}
            disabled={!editor.can().sinkListItem("listItem")}
            icon={<Indent />}
            title="Indent"
          />
          <RibbonButton
            onClick={() => FormatCommands.outdent(editor)}
            disabled={!editor.can().liftListItem("listItem")}
            icon={<Outdent />}
            title="Outdent"
          />
        </div>
      </RibbonGroup>

      <RibbonGroup label="Styles">
        <div className="flex flex-col gap-2 min-w-[120px]">
          <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded h-full">
            <FileText size={20} className="text-blue-500" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] text-zinc-400 font-bold uppercase leading-none mb-1">
                Text Style
              </span>
              <select
                className="text-xs bg-transparent outline-none font-semibold w-full cursor-pointer"
                value={getCurrentStyle()}
                onChange={(e) => handleStyleChange(e.target.value)}
              >
                {STYLES.map((s) => {
                  // SEO Validation: Disable heading levels that skip hierarchy
                  let isDisabled = false;
                  if (s.value.startsWith("heading")) {
                    const level = parseInt(s.value.replace("heading", ""));
                    console.log(level, highestHierarchy, currentLevel());

                    // if (currentLevel() === 0) {
                    //   if (
                    //     level > highestHierarchy + 1 ||
                    //     highestHierarchy > level
                    //   ) {
                    //     isDisabled = true;
                    //   }
                    // } else if (
                    //   level > currentLevel() ||
                    //   currentLevel() > level + 1
                    // ) {
                    //   isDisabled = true;
                    // }
                    // if (currentLevel() === 0) {
                    //   if (
                    //     level > highestHierarchy + 1 ||
                    //     highestHierarchy > level
                    //   ) {
                    //     isDisabled = true;
                    //   }
                    // } else {
                    //   if (
                    //     level < currentLevel() - 1 ||
                    //     level > currentLevel() + 1
                    //   ) {
                    //     isDisabled = true;
                    //   }
                    // }
                    if (currentLevel() === 0) {
                      // যদি পুরো ডকুমেন্টে কোনো হেডিংই না থাকে (highestHierarchy === 0)
                      if (highestHierarchy === 0) {
                        // শুরু করার জন্য H1, H2 এবং H3 এলাউ করা ভালো
                        if (level > 3) {
                          isDisabled = true;
                        }
                      } else {
                        // যদি আগে কোনো হেডিং থেকে থাকে, তবে সেটার সাথে সামঞ্জস্য রেখে হবে
                        if (
                          level > highestHierarchy + 1 ||
                          highestHierarchy > level
                        ) {
                          isDisabled = true;
                        }
                      }
                    } else {
                      // বর্তমান লেভেলের সাথে সামঞ্জস্য (±1 level)
                      if (
                        level < currentLevel() - 1 ||
                        level > currentLevel() + 1
                      ) {
                        isDisabled = true;
                      }
                    }
                  }

                  return (
                    <option key={s.value} value={s.value} disabled={isDisabled}>
                      {s.label} {isDisabled ? " (Locked)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </RibbonGroup>
    </>
  );
});

HomeTab.displayName = "HomeTab";
