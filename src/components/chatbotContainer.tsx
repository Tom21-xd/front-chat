import Chat from "./chat/chat";

export default function ChatContainer({
  chatId,
  chatTitle,
}: {
  chatId: string;
  chatTitle: string;
}) {
  return (
    <div className="flex flex-col h-full bg-white relative z-0">
      <header className="px-6 pt-4 pb-2 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Chat: {chatTitle}
        </h2>
      </header>

      <div className="flex-1 overflow-y-scroll">
        <Chat />
      </div>
    </div>
  );
}
