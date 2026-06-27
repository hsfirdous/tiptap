import { Editor } from '@tiptap/react'

export const setFontFamily = (editor: Editor, fontFamily: string) => {
  if (fontFamily === 'Default' || !fontFamily) {
    return editor.chain().focus().unsetFontFamily().run()
  }
  return editor.chain().focus().setFontFamily(fontFamily).run()
}

export const setFontSize = (editor: Editor, fontSize: string) => {
  if (!fontSize) {
    return editor.chain().focus().unsetFontSize().run()
  }
  // Ensure we add 'px' if it's just a number
  const size = /^\d+$/.test(fontSize) ? `${fontSize}px` : fontSize
  return editor.chain().focus().setFontSize(size).run()
}

export const setLineHeight = (editor: Editor, lineHeight: string) => {
  if (lineHeight === 'Default' || lineHeight === 'normal') {
    return editor.chain().focus().unsetLineHeight().run()
  }
  return editor.chain().focus().setLineHeight(lineHeight).run()
}
