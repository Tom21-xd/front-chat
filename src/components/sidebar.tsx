"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  SquarePen,
} from "lucide-react";
import { SidebarFooter } from "./sidebarFooter";

export default function Sidebar({
  onSelect,
  onRename,
  chatTitle,
  collapsed,
  setCollapsed,
  isMobile = false,
}: {
  onSelect: (id: string, title: string) => void;
  onRename: (title: string) => void;
  chatTitle: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile?: boolean;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogoClick = () => {
    onSelect("", "");
    router.push("/");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRename(e.target.value);
  };

  return (
    <aside
      className={`h-screen flex flex-col bg-gray-800 text-white p-4 border-r border-gray-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } ${isMobile && !collapsed ? "fixed z-50 top-0 left-0" : "relative"}`}
    >
      <div className="flex items-center justify-between mb-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={handleLogoClick}
            />

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-gray-300 mt-2 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <>
            <div onClick={handleLogoClick} className="cursor-pointer">
              <Image
                src="/logo-transparent-small.webp"
                alt="Logo ChatJMS"
                width={120}
                height={40}
                priority
              />
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-gray-300 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft size={24} />
            </button>
          </>
        )}
      </div>

      {collapsed ? (
        <button
          className="w-full py-2 flex justify-center items-center rounded hover:bg-gray-700 cursor-pointer"
          onClick={() => onSelect(chatTitle, chatTitle)}
          title="Abrir chat"
        >
          <MessageCircle size={20} />
        </button>
      ) : (
        <>
          <h2 className="text-lg font-bold mt-4 mb-2">Chat actual</h2>

          <div
            className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => onSelect(chatTitle, chatTitle)}
          >
            {isEditing ? (
              <input
                value={chatTitle}
                onChange={handleTitleChange}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditing(false);
                }}
                className="bg-gray-700 text-white px-2 py-1 rounded w-full outline-none"
                autoFocus
              />
            ) : (
              <div className="flex justify-between items-center">
                <span className="truncate max-w-[80%] overflow-hidden whitespace-nowrap">
                  {chatTitle}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="ml-2 transition hover:text-gray-300 z-10 cursor-pointer"
                  aria-label="Editar nombre del chat"
                >
                  <SquarePen className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}
