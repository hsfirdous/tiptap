import { Editor } from '@tiptap/react'

export const setTextColor = (editor: Editor, color: string) => {
  if (color === 'inherit' || color === 'transparent') {
    return editor.chain().focus().unsetColor().run()
  }
  return editor.chain().focus().setColor(color).run()
}

export const setHighlightColor = (editor: Editor, color: string) => {
  if (color === 'transparent') {
    return editor.chain().focus().unsetHighlight().run()
  }
  return editor.chain().focus().setHighlight({ color }).run()
}
