
// components/ChatBox.tsx
import { useState } from 'react';

export default function ChatBox({ messages, onSend }: { messages: { role: string; content: string }[]; onSend: (msg: string) => void }) {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 my-1 rounded ${m.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>{m.content}</div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          onSend(input);
          setInput('');
        }}
        className="flex gap-2"
      >
        <input className="flex-1 border rounded p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta..." />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </div>
  );
}
