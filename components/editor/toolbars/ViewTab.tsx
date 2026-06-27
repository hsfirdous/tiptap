"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Moon, Sun, Eye, EyeOff, Maximize, Minimize, Type } from "lucide-react";
import { RibbonButton } from "./RibbonButton";
import { RibbonGroup } from "./RibbonGroup";

interface ViewTabProps {
  editor: Editor;
}

export const ViewTab = React.memo(({ editor }: ViewTabProps) => {
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
      <RibbonGroup label="Theme">
        <RibbonButton
          label="Dark"
          large
          icon={<Moon />}
          onClick={() => document.documentElement.classList.add("dark")}
        />
        <RibbonButton
          label="Light"
          large
          icon={<Sun />}
          onClick={() => document.documentElement.classList.remove("dark")}
        />
      </RibbonGroup>

      <RibbonGroup label="Modes">
        <RibbonButton
          label="Focus"
          large
          icon={<Eye />}
          onClick={() => document.body.classList.toggle("focus-mode")}
        />
        <RibbonButton
          label="Fullscreen"
          large
          icon={<Maximize />}
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              if (document.exitFullscreen) document.exitFullscreen();
            }
          }}
        />
      </RibbonGroup>

      <RibbonGroup label="Show">
        <div className="flex flex-col gap-0.5">
          <RibbonButton
            icon={<Type />}
            label="Invisibles"
            onClick={() => {}}
            className="w-24 flex-row gap-2 px-2"
          />
        </div>
      </RibbonGroup>
    </div>
  );
});

ViewTab.displayName = "ViewTab";
