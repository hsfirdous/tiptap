import { Node, mergeAttributes } from '@tiptap/core'

export const Toggle = Node.create({
  name: 'toggle',
  group: 'block',
  content: 'paragraph block*',
  
  addAttributes() {
    return {
      open: {
        default: false,
        parseHTML: element => element.hasAttribute('open'),
        renderHTML: attributes => {
          if (attributes.open) {
            return { open: '' }
          }
          return {}
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'details',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'details',
      mergeAttributes(HTMLAttributes, { class: 'toggle-block mb-2' }),
      ['summary', { class: 'cursor-pointer list-none flex items-center gap-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1 rounded transition-colors' }, 
        ['span', { class: 'w-5 h-5 flex items-center justify-center transition-transform duration-200 group-open:rotate-90' }, '▶'],
        0
      ],
    ]
  },
})

export default Toggle
