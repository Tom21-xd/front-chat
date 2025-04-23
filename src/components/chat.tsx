'use client';

import { useEffect, useState } from 'react';
import MessageBubble from './messageBubble';
import { askQuestion, askFromAudio, uploadPDF } from '@/service/chatService';
import { useRecorder } from '@/hooks/useRecorder';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export default function Chat() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { start, stop, isRecording, audioBlob } = useRecorder();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || selected.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF');
      return;
    }

    try {
      await uploadPDF(selected);
      setFile(selected);
      setMessages([]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askQuestion(input);
      const aiMessage = { role: 'ai' as const, content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioBlob) {
      const audioFile = new File([audioBlob], 'grabacion.webm', { type: 'audio/webm' });

      const userMessage = { role: 'user' as const, content: '[🎙️ Audio enviado]' };
      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      askFromAudio(audioFile)
        .then((response) => {
          const aiMessage = { role: 'ai' as const, content: response };
          setMessages(prev => [...prev, aiMessage]);
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    }
  }, [audioBlob]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 bg-white shadow rounded-lg">
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 p-10 rounded-lg text-center bg-gray-500">
          <p className="mb-4 text-cyan-400 font-medium">Sube un archivo PDF para comenzar</p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="mx-auto cursor-pointer"
          />
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-700 font-medium border-b pb-2">
            📄 {file.name}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto bg-gray-100 p-4 rounded">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} role={msg.role} content={msg.content} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 mt-2 items-center">
            <input
              className="flex-1 border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              disabled={loading}
            >
              {loading ? '...' : 'Enviar'}
            </button>

            <button
              type="button"
              onMouseDown={start}
              onMouseUp={stop}
              onTouchStart={start}
              onTouchEnd={stop}
              className={`w-11 h-11 flex items-center justify-center rounded-full transition ${
                isRecording ? 'bg-red-600 animate-pulse' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title="Mantén presionado para grabar"
            >
              🎤
            </button>
          </form>
        </>
      )}
    </div>
  );
}
