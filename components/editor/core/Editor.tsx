"use client";

import { useEditor } from "@/hooks/use-editor";
import { EditorProps } from "@/types/editor";
import { DesktopEditor } from "./DesktopEditor";
import { MobileEditor } from "./MobileEditor";
import { useMobile } from "@/hooks/use-mobile";

export const Editor = ({
  initialContent,
  onUpdate,
  onSave,
  className,
}: EditorProps) => {
  const editor = useEditor({ initialContent, onUpdate, onSave });
  const isMobile = useMobile();

  if (!editor) {
    return null;
  }

  return isMobile ? (
    <MobileEditor editor={editor} className={className} />
  ) : (
    <DesktopEditor editor={editor} className={className} />
  );
};

export default Editor;
