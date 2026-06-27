"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Image as ImageIcon,
  Table as TableIcon,
  Columns,
  Minus,
  Code2,
  MessageSquare,
  ToggleLeft,
  ExternalLink,
} from "lucide-react";
import { RibbonButton } from "./RibbonButton";
import { RibbonGroup } from "./RibbonGroup";

interface InsertTabProps {
  editor: Editor;
}

export const InsertTab = React.memo(({ editor }: InsertTabProps) => {
  // Local state to force re-render on editor changes
  const [tick, setTick] = useState(0);
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
      <RibbonGroup label="Media">
        <RibbonButton
          label="Image"
          large
          icon={<ImageIcon />}
          onClick={() => {
            let url = "";
            try {
              url = window.prompt("Enter image URL") || "";
            } catch (e) {
              console.warn("prompt() is not supported");
            }
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        />
        <RibbonButton
          label="Embed"
          large
          icon={<ExternalLink />}
          onClick={() => {
            let url = "";
            try {
              url = window.prompt("Enter embed URL") || "";
            } catch (e) {
              console.warn("prompt() is not supported");
            }
            if (url)
              editor
                .chain()
                .focus()
                .insertContent({ type: "embed", attrs: { url } })
                .run();
          }}
        />
      </RibbonGroup>

      <RibbonGroup label="Tables">
        <RibbonButton
          label="Table"
          large
          icon={<TableIcon />}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />
      </RibbonGroup>

      <RibbonGroup label="Layout">
        <RibbonButton
          label="Columns"
          large
          icon={<Columns />}
          onClick={() => {
            // @ts-ignore
            if (editor.commands.setColumns) {
              // @ts-ignore
              editor.commands.setColumns(2);
            }
          }}
        />
        <RibbonButton
          label="Divider"
          icon={<Minus />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </RibbonGroup>

      <RibbonGroup label="Blocks">
        <div className="grid grid-cols-2 gap-0.5">
          <RibbonButton
            label="Callout"
            icon={<MessageSquare />}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertContent({
                  type: "callout",
                  content: [{ type: "paragraph" }],
                })
                .run()
            }
          />
          <RibbonButton
            label="Toggle"
            icon={<ToggleLeft />}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertContent({
                  type: "toggle",
                  content: [{ type: "paragraph" }],
                })
                .run()
            }
          />
          <RibbonButton
            label="Code"
            icon={<Code2 />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
        </div>
      </RibbonGroup>
    </div>
  );
});

InsertTab.displayName = "InsertTab";
