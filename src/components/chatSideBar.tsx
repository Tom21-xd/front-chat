
// components/ChatSidebar.tsx
export default function ChatSidebar({ chats, currentChatId, onSelect, onNewChat }: {
    chats: { id: string; name: string }[];
    currentChatId: string | null;
    onSelect: (id: string) => void;
    onNewChat: () => void;
  }) {
    return (
      <aside className="w-64 border-r p-4 h-screen overflow-y-auto">
        <button className="w-full mb-4 bg-blue-500 text-white py-2 rounded" onClick={onNewChat}>+ Nuevo Chat</button>
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`p-2 rounded cursor-pointer ${chat.id === currentChatId ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            {chat.name}
          </div>
        ))}
      </aside>
    );
}
  