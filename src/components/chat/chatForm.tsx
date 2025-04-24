"use client";

import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { Mic, Send } from "lucide-react";

interface ChatFormProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  isRecording: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  startRecording: () => void;
  stopRecording: () => void;
}

export default function ChatForm({
  input,
  setInput,
  loading,
  isRecording,
  onSubmit,
  startRecording,
  stopRecording,
}: ChatFormProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-white px-2 sm:px-4 md:px-6 py-4">
      <form onSubmit={onSubmit} className="flex items-center sm:gap-2 gap-1">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          }`}
          disabled={loading}
        >
          {isMobile ? (
            <Send className="w-5 h-5" />
          ) : (
            <>
              Enviar <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (!isMobile && !loading) {
              isRecording ? stopRecording() : startRecording();
            }
          }}
          onMouseDown={() => {
            if (isMobile && !loading) startRecording();
          }}
          onMouseUp={() => {
            if (isMobile && !loading) stopRecording();
          }}
          
          onTouchStart={() => {
            if (isMobile && !loading) startRecording();
          }}
          
          onTouchEnd={() => {
            if (isMobile && !loading) stopRecording();
          }}
          
          className={`w-11 h-11 flex items-center justify-center rounded-full transition ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : isRecording
              ? "bg-red-600 animate-pulse scale-105"
              : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
          } `}
          title={
            loading
              ? "Espera a que se procese la respuesta"
              : isMobile
              ? "Mantén presionado para grabar"
              : isRecording
              ? "Haz clic para detener"
              : "Haz clic para grabar"
          }
        >
          <Mic className="w-5 h-5 text-black" />
        </button>

        {/*
          {loading && (
            <button
              type="button"
              onClick={() => abortController?.abort()}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 transition text-white cursor-pointer"
              title="Cancelar solicitud"
            >
              <Square className="w-5 h-5 text-red-500 hover:text-red-600 transition transition-transform" />
            </button>
          )}
        */}
      </form>
    </div>
  );
}
