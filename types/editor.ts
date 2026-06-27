import { Editor } from "@tiptap/react";
import { LucideIcon } from "lucide-react";

export type ToolbarMode = "notion" | "ribbon";

export type EditorProps = {
  initialContent?: string;
  onUpdate?: (content: string) => void;
  onSave?: (content: any) => void;
  className?: string;
};

export interface SuggestionItem {
  title: string;
  description: string;
  icon: LucideIcon;
  searchTerms?: string[];
  command: (props: { editor: Editor; range: any }) => void;
}

export interface ColumnProps {
  width: string;
}

export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulletList"
  | "orderedList"
  | "taskList"
  | "blockquote"
  | "codeBlock"
  | "table"
  | "image"
  | "callout"
  | "toggle";
