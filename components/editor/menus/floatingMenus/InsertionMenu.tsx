"use client"

import React from 'react'
import { 
  Plus, 
  Type, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Quote, 
  Code, 
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  MessageSquare,
  Play,
  Columns,
  Layout,
  Share2,
  Bookmark as BookmarkIcon,
  File as FileIcon,
  List as ListIcon
} from 'lucide-react'
import { Editor } from '@tiptap/react'

interface InsertionMenuProps {
  editor: Editor
  onSelect: () => void
}

export const InsertionMenu = ({ editor, onSelect }: InsertionMenuProps) => {
  const items = [
    {
      icon: <Type size={16} />,
      label: 'Text',
      description: 'Just start writing with plain text.',
      command: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: <Heading1 size={16} />,
      label: 'Heading 1',
      description: 'Big section heading.',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 size={16} />,
      label: 'Heading 2',
      description: 'Medium section heading.',
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 size={16} />,
      label: 'Heading 3',
      description: 'Small section heading.',
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <List size={16} />,
      label: 'Bullet List',
      description: 'Create a simple bulleted list.',
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered size={16} />,
      label: 'Numbered List',
      description: 'Create a list with numbering.',
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <CheckSquare size={16} />,
      label: 'Todo List',
      description: 'Track tasks with a todo list.',
      command: () => editor.chain().focus().toggleTaskList().run(),
    },
    {
      icon: <Quote size={16} />,
      label: 'Quote',
      description: 'Capture a quotation.',
      command: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: <Minus size={16} />,
      label: 'Divider',
      description: 'Visually divide sections.',
      command: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <TableIcon size={16} />,
      label: 'Table',
      description: 'Insert a 3x3 table.',
      command: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      icon: <ImageIcon size={16} />,
      label: 'Image',
      description: 'Upload or insert an image.',
      command: () => editor.chain().focus().setImage({ src: '' }).run(),
    },
    {
      icon: <Code size={16} />,
      label: 'Code Block',
      description: 'Capture a code snippet.',
      command: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      icon: <MessageSquare size={16} />,
      label: 'Callout',
      description: 'Add a block with an icon.',
      command: () => editor.chain().focus().insertContent({ type: 'callout' }).run(),
    },
    {
      icon: <Play size={16} />,
      label: 'Toggle',
      description: 'Collapse content inside.',
      command: () => editor.chain().focus().insertContent({ type: 'toggle' }).run(),
    },
    {
      icon: <Columns size={16} />,
      label: '2 Columns',
      description: 'Split the layout into two.',
      command: () => editor.chain().focus().insertContent({
        type: 'columnGroup',
        content: [
          { type: 'column', attrs: { width: 50 }, content: [{ type: 'paragraph' }] },
          { type: 'column', attrs: { width: 50 }, content: [{ type: 'paragraph' }] },
        ],
      }).run(),
    },
    {
      icon: <Layout size={16} />,
      label: '3 Columns',
      description: 'Split the layout into three.',
      command: () => editor.chain().focus().insertContent({
        type: 'columnGroup',
        content: [
          { type: 'column', attrs: { width: 33.33 }, content: [{ type: 'paragraph' }] },
          { type: 'column', attrs: { width: 33.33 }, content: [{ type: 'paragraph' }] },
          { type: 'column', attrs: { width: 33.33 }, content: [{ type: 'paragraph' }] },
        ],
      }).run(),
    },
    {
      icon: <Share2 size={16} />,
      label: 'Embed',
      description: 'Embed video, tweets, and more.',
      command: () => editor.chain().focus().insertContent({ type: 'embed', attrs: { url: '' } }).run(),
    },
    {
      icon: <BookmarkIcon size={16} />,
      label: 'Bookmark',
      description: 'Save a link as a card.',
      command: () => editor.chain().focus().insertContent({ type: 'bookmark', attrs: { url: '' } }).run(),
    },
    {
      icon: <FileIcon size={16} />,
      label: 'File',
      description: 'Upload a file attachment.',
      command: () => editor.chain().focus().insertContent({ type: 'fileAttachment', attrs: { url: '', name: '' } }).run(),
    },
    {
      icon: <ListIcon size={16} />,
      label: 'Table of Contents',
      description: 'Show an overview of your page.',
      command: () => editor.chain().focus().insertContent({ type: 'tableOfContents' }).run(),
    },
  ]

  return (
    <div className="flex flex-col w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100 max-h-[400px] overflow-y-auto">
      <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
        Basic Blocks
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              item.command()
              onSelect()
            }}
            className="flex items-center gap-3 px-2 py-2 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm text-zinc-500">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{item.label}</span>
              <span className="text-[11px] text-zinc-400 leading-tight">{item.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
