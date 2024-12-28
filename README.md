# Custom Color Highlighter Extension for Tiptap

This document explains how to create, integrate, and use the **Custom Color Highlighter** as a reusable Tiptap extension in a React-based application.

---

## 1. Overview

The **Custom Color Highlighter** is a Tiptap extension that allows users to apply custom background colors to selected text in the editor. This is achieved by leveraging the `TextStyle` mark to dynamically add and render `backgroundColor` styles.

---

## 2. Key Features

- Easily apply background colors to selected text.
- Configure custom color palettes.
- Seamlessly integrate into any Tiptap editor.

---

## 3. Code Implementation

### 3.1 Extension Code

Save the following code as `colorHighlighter.js`:

```javascript
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
        types: ['textStyle'],
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
```

---

### 3.2 Integration in a React App

#### **App Component**

Create a React app using Vite or any other tool. Replace the contents of `App.jsx` with the following:

```jsx
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import ColorHighlighter from './extensions/colorHighlighter'

const App = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      ColorHighlighter.configure({
        colors: ['#FFEB3B', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'],
      }),
    ],
    content: '<p>Select text and highlight it with custom colors!</p>',
  })

  const applyHighlight = (color) => {
    if (editor) {
      editor.chain().focus().setHighlightColor(color).run()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Custom Color Highlighter</h1>

      {/* Toolbar */}
      <div className="mb-4 flex gap-2">
        {["#FFEB3B", "#8BC34A", "#03A9F4", "#E91E63", "#9C27B0"].map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
            onClick={() => applyHighlight(color)}
            title={`Highlight with ${color}`}
          />
        ))}
      </div>

      {/* Editor */}
      <div className="bg-white border rounded-md shadow-md p-4">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>

      {!editor && <p className="text-red-500 mt-4">Editor is not initialized!</p>}
    </div>
  )
}

export default App
```

---

### 3.3 Run the App

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser, typically at `http://localhost:5173`.

3. Select text in the editor and click a color button to apply a highlight.

---

## 4. Hosting the App

If you want the app to be accessible online:

### 4.1 Build for Production

Create a production build:
```bash
npm run build
```

### 4.2 Deploy the App

Host the `dist` folder using any of these services:

- **Netlify**: Drag and drop the `dist` folder into Netlify’s dashboard.
- **Vercel**: Deploy directly from GitHub or via the CLI.
- **GitHub Pages**: Push the build to a repository and enable GitHub Pages.

---

## 5. Using It as a Browser-Based Extension

To integrate this editor into other browser-based applications, deploy the app and embed it in an `iframe` or include its hosted URL where needed.

---

## 6. Advanced Usage

### 6.1 Custom Color Palette

To use a different set of colors, configure the extension:

```javascript
ColorHighlighter.configure({
  colors: ['#FFFFFF', '#000000', '#FF0000'],
})
```

### 6.2 Publishing as an NPM Package

If you want to reuse this extension across projects:

1. Publish it to NPM:
   ```bash
   npm publish
   ```

2. Install it in another project:
   ```bash
   npm install your-package-name
   ```

---

## 7. Conclusion

The **Custom Color Highlighter** is a powerful and reusable extension for Tiptap that enables users to enhance their editing experience by easily applying background colors to selected text. Whether used locally, hosted online, or published as a package, it’s a flexible tool for rich text editing.

