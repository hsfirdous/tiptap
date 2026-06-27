import { TableHeader as TiptapTableHeader } from "@tiptap/extension-table-header";

export const TableHeader = TiptapTableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {};
          return { style: `background-color: ${attributes.backgroundColor}` };
        },
      },
      borderColor: {
        default: null,
        parseHTML: (element) => element.style.borderColor || null,
        renderHTML: (attributes) => {
          if (!attributes.borderColor) return {};
          return { style: `border-color: ${attributes.borderColor}` };
        },
      },
      borderWidth: {
        default: null,
        parseHTML: (element) => element.style.borderWidth || null,
        renderHTML: (attributes) => {
          if (!attributes.borderWidth) return {};
          return { style: `border-width: ${attributes.borderWidth}` };
        },
      },
      borderStyle: {
        default: null,
        parseHTML: (element) => element.style.borderStyle || null,
        renderHTML: (attributes) => {
          if (!attributes.borderStyle) return {};
          return { style: `border-style: ${attributes.borderStyle}` };
        },
      },
      textAlign: {
        default: null,
        parseHTML: (element) => element.style.textAlign || null,
        renderHTML: (attributes) => {
          if (!attributes.textAlign) return {};
          return { style: `text-align: ${attributes.textAlign}` };
        },
      },
      verticalAlign: {
        default: null,
        parseHTML: (element) => element.style.verticalAlign || null,
        renderHTML: (attributes) => {
          if (!attributes.verticalAlign) return {};
          return { style: `vertical-align: ${attributes.verticalAlign}` };
        },
      },
      fontWeight: {
        default: null,
        parseHTML: (element) => element.style.fontWeight || null,
        renderHTML: (attributes) => {
          if (!attributes.fontWeight) return {};
          return { style: `font-weight: ${attributes.fontWeight}` };
        },
      },
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
      textColor: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) => {
          if (!attributes.textColor) return {};
          return { style: `color: ${attributes.textColor}` };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const styles: string[] = [];
    if (HTMLAttributes.style) styles.push(HTMLAttributes.style);

    if (HTMLAttributes.backgroundColor)
      styles.push(`background-color: ${HTMLAttributes.backgroundColor}`);
    if (HTMLAttributes.borderColor)
      styles.push(`border-color: ${HTMLAttributes.borderColor}`);
    if (HTMLAttributes.borderWidth)
      styles.push(`border-width: ${HTMLAttributes.borderWidth}`);
    if (HTMLAttributes.borderStyle)
      styles.push(`border-style: ${HTMLAttributes.borderStyle}`);
    if (HTMLAttributes.textAlign)
      styles.push(`text-align: ${HTMLAttributes.textAlign}`);
    if (HTMLAttributes.verticalAlign)
      styles.push(`vertical-align: ${HTMLAttributes.verticalAlign}`);
    if (HTMLAttributes.fontWeight)
      styles.push(`font-weight: ${HTMLAttributes.fontWeight}`);
    if (HTMLAttributes.fontSize)
      styles.push(`font-size: ${HTMLAttributes.fontSize}`);
    if (HTMLAttributes.textColor)
      styles.push(`color: ${HTMLAttributes.textColor}`);

    const finalAttributes = { ...HTMLAttributes };
    if (styles.length > 0) {
      finalAttributes.style = styles.join("; ");
    }

    delete finalAttributes.backgroundColor;
    delete finalAttributes.borderColor;
    delete finalAttributes.borderWidth;
    delete finalAttributes.borderStyle;
    delete finalAttributes.textAlign;
    delete finalAttributes.verticalAlign;
    delete finalAttributes.fontWeight;
    delete finalAttributes.fontSize;
    delete finalAttributes.textColor;

    return ["th", finalAttributes, 0];
  },
});
