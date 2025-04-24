import { useMemo } from "react";

export default function MessageBubble({
  role,
  content,
  audioBlob,
}: {
  role: "user" | "ai";
  content: string;
  audioBlob?: Blob;
}) {
  const isUser = role === "user";
  const isAudio = !!audioBlob;

  const audioUrl = useMemo(() => {
    if (audioBlob) return URL.createObjectURL(audioBlob);
    return null;
  }, [audioBlob]);
  return (
    <div
      className={`p-3 rounded-lg max-w-[85%] whitespace-pre-wrap ${
        isUser
          ? "bg-blue-500 text-white self-end ml-auto text-right"
          : "bg-gray-200 text-gray-900 self-start mr-auto text-left"
      }`}
    >
      {isAudio ? (
        <>
          <div className="mb-2 text-sm font-medium">
            {isUser ? "🎧 Audio enviado" : "🧠 Respuesta con audio"}
          </div>

          <audio controls autoPlay={!isUser} className="w-full" src={audioUrl!}>
            Tu navegador no soporta la reproducción de audio.
          </audio>

          {content && <div className="mt-2">{content}</div>}
        </>
      ) : (
        content
      )}
    </div>
  );
}
