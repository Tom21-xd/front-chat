'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/chatSideBar';
import UploadPDF from '@/components/uploadPDF';
import ChatBox from '@/components/chatBox';
import ChatHeader from '@/components/chatHeader';

type Chat = {
  id: string;
  name: string;
  file: File;
  messages: { role: 'user' | 'ai'; content: string }[];
};

export default function HomePage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId) || null;

  const handleUpload = (file: File) => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      name: file.name,
      file,
      messages: [],
    };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  const handleSendMessage = (text: string) => {
    if (!currentChat) return;

    const newMessage = { role: 'user', content: text };
    const updatedChats = chats.map(chat =>
      chat.id === currentChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );
    
  };

  return (
    <div className="flex">
      <ChatSidebar
        chats={chats.map(({ id, name }) => ({ id, name }))}
        currentChatId={currentChatId}
        onSelect={setCurrentChatId}
        onNewChat={() => setCurrentChatId(null)}
      />

      <div className="flex-1 p-6">
        {!currentChat ? (
          <UploadPDF onUpload={handleUpload} />
        ) : (
          <>
            <ChatHeader
              fileName={currentChat.name}
              onReplace={() => setCurrentChatId(null)}
            />
            <ChatBox messages={currentChat.messages} onSend={handleSendMessage} />
          </>
        )}
      </div>
    </div>
  );
}
