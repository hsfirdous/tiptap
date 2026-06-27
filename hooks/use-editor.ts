import { useEditor as useTiptapEditor, ReactRenderer } from "@tiptap/react";
import { extensions } from "@/components/editor/extensions";
import { EditorProps } from "@/types/editor";
import {
  getSuggestionItems,
  SlashCommandList,
} from "@/components/editor/menus/dropdowns/SlashCommandMenu";
import { EmojiList } from "@/components/editor/menus/dropdowns/EmojiList";
import { MentionList } from "@/components/editor/menus/dropdowns/MentionList";
import tippy from "tippy.js";
import Emoji from "@tiptap/extension-emoji";
import Mention from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";

const SlashCommandKey = new PluginKey("slash-command");
const EmojiKey = new PluginKey("emoji");
const MentionKey = new PluginKey("mention");

export const useEditor = ({
  initialContent,
  onUpdate,
  onSave,
}: EditorProps = {}) => {
  const editor = useTiptapEditor({
    extensions: [
      ...extensions.filter((e) => e.name !== "slashCommand"),
      // @ts-ignore
      extensions
        .find((e) => e.name === "slashCommand")
        ?.configure({
          suggestion: {
            pluginKey: SlashCommandKey,
            items: getSuggestionItems,
            render: () => {
              let component: any;
              let popup: any;

              return {
                onStart: (props: any) => {
                  component = new ReactRenderer(SlashCommandList, {
                    props,
                    editor: props.editor,
                  });

                  popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                  });
                },
                onUpdate(props: any) {
                  component.updateProps(props);

                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                  });
                },
                onKeyDown(props: any) {
                  if (props.event.key === "Escape") {
                    popup[0].hide();
                    return true;
                  }

                  return component.ref?.onKeyDown(props);
                },
                onExit() {
                  popup[0].destroy();
                  component.destroy();
                },
              };
            },
          },
        }),
      Emoji.configure({
        suggestion: {
          pluginKey: EmojiKey,
          items: ({ query }: any) => {
            return [
              { name: "smile", emoji: "😊" },
              { name: "heart", emoji: "❤️" },
              { name: "rocket", emoji: "🚀" },
              { name: "fire", emoji: "🔥" },
              { name: "laugh", emoji: "😂" },
            ]
              .filter((item) =>
                item.name.toLowerCase().startsWith(query.toLowerCase()),
              )
              .slice(0, 10);
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(EmojiList, {
                  props,
                  editor: props.editor,
                });

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },
              onUpdate(props: any) {
                component.updateProps(props);

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props: any) {
                if (props.event.key === "Escape") {
                  popup[0].hide();
                  return true;
                }

                return component.ref?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class:
            "mention bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-1 rounded font-medium",
        },
        suggestion: {
          pluginKey: MentionKey,
          items: ({ query }: any) => {
            return [
              "Lea Thompson",
              "Cyndi Lauper",
              "Tom Cruise",
              "Madonna",
              "Jerry Hall",
              "Joan Collins",
              "Winona Ryder",
              "Christina Applegate",
              "Alyssa Milano",
              "Molly Ringwald",
              "Ally Sheedy",
              "Debbie Harry",
              "Olivia Newton-John",
              "Princess Diana",
              "Kelly LeBrock",
              "Heather Locklear",
              "Goldie Hawn",
            ]
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase()),
              )
              .slice(0, 5);
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },
              onUpdate(props: any) {
                component.updateProps(props);

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props: any) {
                if (props.event.key === "Escape") {
                  popup[0].hide();
                  return true;
                }

                return component.ref?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
    ].filter(Boolean) as any,
    content: initialContent || "",
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert focus:outline-none max-w-none min-h-[500px] w-full py-12",
      },
    },
    immediatelyRender: false,
  });

  return editor;
};

export default useEditor;
