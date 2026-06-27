"use client"

import React, { useState } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Link as LinkIcon, ExternalLink } from 'lucide-react'

export const BookmarkView = (props: NodeViewProps) => {
  const { node, updateAttributes } = props
  const { url, title, description, image } = node.attrs
  const [tempUrl, setTempUrl] = useState(url || '')

  const handleUrlSubmit = () => {
    if (tempUrl) updateAttributes({ url: tempUrl })
  }

  if (!url) {
    return (
      <NodeViewWrapper className="my-8 p-6 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 text-zinc-400">
          <LinkIcon size={24} />
          <span className="text-sm font-medium">Create Bookmark</span>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <input
            autoFocus
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
            className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            placeholder="Paste any link..."
          />
          <button onClick={handleUrlSubmit} className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-md transition-colors hover:bg-zinc-800 dark:hover:bg-white">
            Create
          </button>
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="my-6 relative group/bookmark">
      <button 
        onClick={() => updateAttributes({ url: '' })}
        className="absolute -top-2 -right-2 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full opacity-0 group-hover/bookmark:opacity-100 transition-opacity z-10 shadow-sm text-zinc-400 hover:text-blue-500"
      >
        <LinkIcon size={12} />
      </button>
      
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex h-32 w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
      >
        <div className="flex flex-col flex-1 p-4 min-w-0 justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {title || url}
            </span>
            <span className="text-xs text-zinc-500 line-clamp-2">
              {description || 'No description available'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`} className="w-3 h-3" alt="favicon" />
            <span className="truncate">{new URL(url).hostname}</span>
          </div>
        </div>
        
        {image && (
          <div className="w-1/3 border-l border-zinc-100 dark:border-zinc-800 hidden sm:block">
            <img src={image} className="w-full h-full object-cover" alt="Preview" />
          </div>
        )}
      </a>
    </NodeViewWrapper>
  )
}
