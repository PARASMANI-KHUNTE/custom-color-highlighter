import { Extension } from '@tiptap/core'

const ColorHighlighter = Extension.create({
  name: 'colorHighlighter',

  addOptions() {
    return {
      colors: ['#FFEB3B', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'], // Default colors
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'], // Add attributes to the TextStyle mark
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) => element.style.backgroundColor || null,
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {}
              }
              return { style: `background-color: ${attributes.backgroundColor}` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setHighlightColor:
        (color) =>
        ({ commands }) => {
          return commands.setMark('textStyle', { backgroundColor: color })
        },
    }
  },
})

export default ColorHighlighter
