
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import ColorHighlighter from './extensions/ColorHighlighter'

const App = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      ColorHighlighter.configure({
        colors: ['#FFEB3B', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'],
      }),
    ],
    content: '<p>Highlight some text with custom colors!</p>',
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
        {['#FFEB3B', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'].map((color) => (
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
