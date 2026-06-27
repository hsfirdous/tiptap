"use client"

import React, { useEffect, useState } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { List } from 'lucide-react'

export const TableOfContentsView = (props: NodeViewProps) => {
  const { editor } = props
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const updateItems = () => {
      const headings: any[] = []
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          headings.push({
            level: node.attrs.level,
            text: node.textContent,
            pos,
          })
        }
      })
      setItems(headings)
    }

    updateItems()
    editor.on('update', updateItems)
    return () => {
      editor.off('update', updateItems)
    }
  }, [editor])

  const scrollToHeading = (pos: number) => {
    editor.commands.focus(pos)
    const element = editor.view.nodeDOM(pos) as HTMLElement
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <NodeViewWrapper className="my-8 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4 text-zinc-400">
        <List size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">Table of Contents</span>
      </div>
      
      {items.length === 0 ? (
        <p className="text-sm text-zinc-400 italic">Add some headings to see the table of contents.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(item.pos)}
              className="text-left hover:text-blue-500 transition-colors truncate"
              style={{ 
                paddingLeft: `${(item.level - 1) * 1.5}rem`,
                fontSize: `${1 - (item.level - 1) * 0.1}rem`,
                opacity: 1 - (item.level - 1) * 0.2
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </NodeViewWrapper>
  )
}
