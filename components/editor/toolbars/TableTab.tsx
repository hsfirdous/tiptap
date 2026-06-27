"use client";

import React, { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Plus,
  Trash2,
  Merge,
  Split,
  Palette,
  Square,
  Type,
  Baseline,
  MoreVertical,
} from "lucide-react";
import { RibbonButton } from "./RibbonButton";
import { RibbonGroup } from "./RibbonGroup";
import { TEXT_COLORS, BG_COLORS } from "../menus/dropdowns/ColorMenu";
import { cn } from "@/lib/utils";
import * as ColorCommands from "@/components/editor/commands/color";

interface TableTabProps {
  editor: Editor;
}

export const TableTab = React.memo(({ editor }: TableTabProps) => {
  const [showCellColor, setShowCellColor] = useState(false);
  const [showTextColor, setShowTextColor] = useState(false);

  // Local state to force re-render on editor changes
  const [, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick((t) => t + 1), []);

  React.useEffect(() => {
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

  if (!editor.isActive("table")) return null;

  return (
    <div className="flex items-center h-full">
      <RibbonGroup label="Rows">
        <div className="flex flex-col gap-0.5">
          <RibbonButton
            icon={<Plus />}
            label="Insert Above"
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
            className="w-24 flex-row gap-2 px-2"
          />
          <RibbonButton
            icon={<Plus className="rotate-180" />}
            label="Insert Below"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            className="w-24 flex-row gap-2 px-2"
          />
        </div>
        <RibbonButton
          icon={<Trash2 />}
          label="Delete Row"
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
        />
      </RibbonGroup>

      <RibbonGroup label="Columns">
        <div className="flex flex-col gap-0.5">
          <RibbonButton
            icon={<Plus className="-rotate-90" />}
            label="Insert Left"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
            className="w-24 flex-row gap-2 px-2"
          />
          <RibbonButton
            icon={<Plus className="rotate-90" />}
            label="Insert Right"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            className="w-24 flex-row gap-2 px-2"
          />
        </div>
        <RibbonButton
          icon={<Trash2 />}
          label="Delete Column"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
        />
      </RibbonGroup>

      <RibbonGroup label="Merge">
        <RibbonButton
          icon={<Merge />}
          label="Merge Cells"
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.can().mergeCells()}
          large
        />
        <RibbonButton
          icon={<Split />}
          label="Split Cell"
          onClick={() => editor.chain().focus().splitCell().run()}
          disabled={!editor.can().splitCell()}
          large
        />
      </RibbonGroup>

      <RibbonGroup label="Design">
        <div className="relative">
          <RibbonButton
            icon={<Palette />}
            label="Cell Color"
            onClick={() => setShowCellColor(!showCellColor)}
            active={showCellColor}
          />
          {showCellColor && (
            <div className="absolute left-0 top-full mt-1 z-[100]">
              <div
                className="fixed inset-0"
                onClick={() => setShowCellColor(false)}
              />
              <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 w-40 animate-in fade-in zoom-in-95 duration-100">
                {BG_COLORS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      editor
                        .chain()
                        .focus()
                        .setCellAttribute("backgroundColor", c.color)
                        .run();
                      setShowCellColor(false);
                    }}
                    className="w-6 h-6 rounded border border-zinc-100 dark:border-zinc-800 hover:scale-110 active:scale-95 transition-all"
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <RibbonButton
            icon={<Type />}
            label="Text Color"
            onClick={() => setShowTextColor(!showTextColor)}
            active={showTextColor}
          />
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
                    className="w-6 h-6 rounded flex items-center justify-center hover:scale-110 active:scale-95 transition-all font-bold"
                    style={{
                      color: c.color === "inherit" ? "currentColor" : c.color,
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

        <RibbonButton icon={<Square />} label="Borders" onClick={() => {}} />
      </RibbonGroup>

      <RibbonGroup label="Actions">
        <RibbonButton
          icon={<Trash2 />}
          label="Delete Table"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          large
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        />
      </RibbonGroup>
    </div>
  );
});

TableTab.displayName = "TableTab";
