import { Table as TiptapTable } from '@tiptap/extension-table'

export const Table = TiptapTable.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      stickyHeader: {
        default: false,
        parseHTML: element => element.getAttribute('data-sticky-header') === 'true',
        renderHTML: attributes => {
          if (!attributes.stickyHeader) return {}
          return { 'data-sticky-header': 'true' }
        },
      },
      stickyColumn: {
        default: false,
        parseHTML: element => element.getAttribute('data-sticky-column') === 'true',
        renderHTML: attributes => {
          if (!attributes.stickyColumn) return {}
          return { 'data-sticky-column': 'true' }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { stickyHeader, stickyColumn, ...rest } = HTMLAttributes
    
    let classes = rest.class || ''
    if (stickyHeader) classes += ' sticky-header'
    if (stickyColumn) classes += ' sticky-column'
    
    return [
      'div',
      { class: 'table-wrapper overflow-x-auto my-4' },
      [
        'table',
        { 
          ...rest, 
          class: classes.trim() || undefined,
          'data-sticky-header': stickyHeader ? 'true' : undefined,
          'data-sticky-column': stickyColumn ? 'true' : undefined,
        },
        ['tbody', 0],
      ],
    ]
  },
})
