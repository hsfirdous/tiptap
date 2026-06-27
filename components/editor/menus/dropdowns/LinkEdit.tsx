"use client"

import React, { useState } from 'react'
import { Link as LinkIcon, Check, X } from 'lucide-react'

interface LinkEditProps {
  initialUrl?: string
  onSave: (url: string) => void
  onCancel: () => void
}

export const LinkEdit = ({ initialUrl = '', onSave, onCancel }: LinkEditProps) => {
  const [url, setUrl] = useState(initialUrl)

  return (
    <div className="flex items-center gap-1 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-100">
      <input
        autoFocus
        type="url"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave(url)
          if (e.key === 'Escape') onCancel()
        }}
        className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1 min-w-[200px]"
      />
      <button
        onClick={() => onSave(url)}
        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-green-600"
      >
        <Check size={16} />
      </button>
      <button
        onClick={onCancel}
        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-red-600"
      >
        <X size={16} />
      </button>
    </div>
  )
}
