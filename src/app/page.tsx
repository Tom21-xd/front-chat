"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ChatContainer from "@/components/chatbotContainer";

export default function HomePage() {
  const [chat, setChat] = useState<{ id: string; title: string }>({
    id: "Nuevo chat",
    title: "Nuevo chat",
  });
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setCollapsed(mobile);
  }, []);

  const handleSelectChat = (id: string, title: string) => {
    setChat({ id, title });
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const handleUpdateTitle = (newTitle: string) => {
    if (chat) {
      setChat({ ...chat, title: newTitle });
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        onSelect={handleSelectChat}
        onRename={handleUpdateTitle}
        chatTitle={chat?.title || ""}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {!collapsed && isMobile && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <section className="flex-1">
        {chat ? (
          <ChatContainer chatTitle={chat.title} />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
            Selecciona un chat para comenzar
          </div>
        )}
      </section>
    </div>
  );
}
