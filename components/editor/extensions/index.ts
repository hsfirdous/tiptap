import StarterKit from '@tiptap/starter-kit'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapLink from '@tiptap/extension-link'
import { ResizableImage } from './ResizableImage'
import Placeholder from '@tiptap/extension-placeholder'
import { Table as CustomTable } from './Table/Table'
import { TableHeader as CustomTableHeader } from './Table/TableHeader'
import { TableCell as CustomTableCell } from './Table/TableCell'
import TableRow from '@tiptap/extension-table-row'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import { Column } from './Column'
import { ColumnGroup } from './ColumnGroup'
import { Callout } from './Callout'
import { Toggle } from './Toggle'
import { Embed } from './Embed'
import { Bookmark } from './Bookmark'
import { FileAttachment } from './FileAttachment'
import { TableOfContents } from './TableOfContents'
import { SlashCommand } from './SlashCommand'
import { FontSize } from './FontSize'
import { FontFamily } from './FontFamily'
import { LineHeight } from './LineHeight'

const lowlight = createLowlight(common)

export const extensions = [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 py-2 my-4 italic text-zinc-600 dark:text-zinc-400',
      },
    },
    // @ts-ignore
    link: false,
    // @ts-ignore
    underline: false,
  }),
  HorizontalRule.extend({
    renderHTML() {
      return ['hr', { class: 'my-8 border-t border-zinc-200 dark:border-zinc-800' }]
    },
  }),
  TiptapLink.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-500 hover:text-blue-600 underline underline-offset-4 cursor-pointer',
    },
  }),
  ResizableImage.configure({
    allowBase64: true,
  }),
  Placeholder.configure({
    includeChildren: true,
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }
      if (node.type.name === 'codeBlock') {
        return 'Enter code...'
      }
      return "Type '/' for commands..."
    },
  }),
  CustomTable.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-fixed w-full overflow-hidden my-4',
    },
  }),
  TableRow,
  CustomTableHeader,
  CustomTableCell,
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-2',
    },
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: 'flex items-start mb-1',
    },
  }),
  Typography,
  Underline,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  FontSize,
  FontFamily,
  LineHeight,
  CharacterCount,
  Subscript,
  Superscript,
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'javascript',
  }),
  Column,
  ColumnGroup,
  Callout,
  Toggle,
  Embed,
  Bookmark,
  FileAttachment,
  TableOfContents,
  SlashCommand,
]
