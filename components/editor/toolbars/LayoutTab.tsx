"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Columns,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  SeparatorHorizontal,
} from "lucide-react";
import { RibbonButton } from "./RibbonButton";
import { RibbonGroup } from "./RibbonGroup";

interface LayoutTabProps {
  editor: Editor;
}

export const LayoutTab = React.memo(({ editor }: LayoutTabProps) => {
  // Local state to force re-render on editor changes
  const [, setTick] = useState(0);
  const forceUpdate = React.useCallback(() => setTick((t) => t + 1), []);

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

  return (
    <div className="flex items-center h-full">
      <RibbonGroup label="Page Setup">
        <RibbonButton
          label="Full Width"
          large
          icon={<Maximize2 />}
          onClick={() => {
            const el = document.querySelector(".prose");
            if (el) el.classList.toggle("max-w-none");
          }}
        />
        <RibbonButton
          label="Center Page"
          large
          icon={<AlignCenter />}
          onClick={() => {
            const el = document.querySelector(".prose");
            if (el) el.classList.remove("max-w-none");
          }}
        />
      </RibbonGroup>

      <RibbonGroup label="Columns">
        <div className="grid grid-cols-2 gap-0.5">
          <RibbonButton
            label="2 Cols"
            icon={<Columns />}
            onClick={() => {
              // @ts-ignore
              if (editor.commands.setColumns) editor.commands.setColumns(2);
            }}
          />
          <RibbonButton
            label="3 Cols"
            icon={<Columns className="rotate-90" />}
            onClick={() => {
              // @ts-ignore
              if (editor.commands.setColumns) editor.commands.setColumns(3);
            }}
          />
        </div>
      </RibbonGroup>

      <RibbonGroup label="Breaks">
        <RibbonButton
          label="Horizontal Line"
          large
          icon={<SeparatorHorizontal />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </RibbonGroup>
    </div>
  );
});

LayoutTab.displayName = "LayoutTab";
