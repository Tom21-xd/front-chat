"use client";

import { useEffect, useState } from "react";
import {
  askQuestion,
  askFromAudio,
  speakText,
  uploadPDF,
} from "@/service/chatService";
import { useRecorder } from "@/hooks/useRecorder";
import UploadPrompt from "./uploadPrompt";
import ChatForm from "./chatForm";
import MessageBubble from "./messageBubble";
import LoadingIndicator from "../loadingIndicator";

type Message = {
  role: "user" | "ai";
  content: string;
  audioBlob?: Blob;
};

export default function Chat() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingAudioText, setPendingAudioText] = useState<string | null>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const { start, stop, isRecording, audioBlob } = useRecorder();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || selected.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF");
      return;
    }

    try {
      setUploading(true);
      await uploadPDF(selected);
      setFile(selected);
      setMessages([]);
    } catch {
      console.error("Error al subir el PDF.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    abortController?.abort();

    const controller = new AbortController();
    setAbortController(controller);

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await askQuestion(input);
      setPendingAudioText(response);

      const audioBlob = await speakText(response);

      const aiMessage = { role: "ai" as const, content: response, audioBlob };
      setMessages((prev) => [...prev, aiMessage]);
      setPendingAudioText(null);
    } catch (err: unknown) {
      console.error("Error al enviar la pregunta.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioBlob) {
      const audioFile = new File([audioBlob], "grabacion.webm", {
        type: "audio/webm",
      });

      const userMessage = {
        role: "user" as const,
        content: "",
        audioBlob,
      };
      setMessages((prev) => [...prev, userMessage]);

      setLoading(true);

      askFromAudio(audioFile)
        .then((response) => {
          const aiMessage = { role: "ai" as const, content: response };
          setMessages((prev) => [...prev, aiMessage]);
        })
        .catch((err) => {
          console.error("Error al procesar el audio:", err);
          alert(err.message);
        })

        .finally(() => setLoading(false));
    }
  }, [audioBlob]);

  return (
    <div className="flex flex-col px-2 md:px-10 h-full shadow rounded-lg overflow-hidden">
      {!file ? (
        <UploadPrompt uploading={uploading} handleUpload={handleUpload} />
      ) : (
        <>
          <div className="flex gap-2 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM8 13h1.5v1H8v-1zm0 2.5h1.5V17H8v-1.5zM11 13h5v1h-5v-1zm0 2.5h5V17h-5v-1.5z" />
            </svg>

            <span
              className="text-sm text-gray-700 font-medium truncate max-w-xs"
              title={file.name}
            >
              {file.name}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-100 p-4 border-2 border-gray-200 rounded-lg space-y-3">
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                role={msg.role}
                content={msg.content}
                audioBlob={msg.audioBlob}
              />
            ))}

            {loading && (
              <LoadingIndicator
                message={
                  pendingAudioText
                    ? "Cargando audio..."
                    : "Generando respuesta..."
                }
              />
            )}
          </div>

          <div className="shrink-0">
            <ChatForm
              input={input}
              setInput={setInput}
              loading={loading}
              isRecording={isRecording}
              onSubmit={handleSubmit}
              startRecording={start}
              stopRecording={stop}
              abortController={abortController}
            />
          </div>
        </>
      )}
    </div>
  );
}
