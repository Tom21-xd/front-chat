"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import CreatorCard from "@/components/about/creatorCard";

const creators = [
  {
    name: "Johan Steven Ramirez Murcia",
    university: "Universidad de la Amazonia",
    role: "Desarrollador BackEnd",
    image: "/Johan.jpg",
    github: "https://github.com/Tom21-xd",
    linkedin:
      "https://www.linkedin.com/in/johan-steven-ramirez-murcia-95ab80295/",
  },
  {
    name: "Jhoan Sebastian Sierra Perdomo",
    university: "Universidad de la Amazonia",
    role: "Desarrollador FrontEnd",
    image: "/Sebastian.jpg",
    github: "https://github.com/SebastianSierra15",
    linkedin: "https://www.linkedin.com/in/sebastian-sierra-417358263/",
  },
  {
    name: "Michael Andres Martinez Guzman",
    university: "Universidad de la Amazonia",
    role: "Diseñador de UI/UX",
    image: "/Michael.jpg",
    github: "https://github.com/Micha852",
    linkedin: "https://www.linkedin.com/in/mamg0852/",
  },
];

export default function AboutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setCollapsed(mobile);
  }, []);

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        onSelect={() => {}}
        onRename={() => {}}
        chatTitle="Acerca de"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {!collapsed && isMobile && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main className="min-h-screen w-screen bg-gray-50 px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-14">
          Creadores del Proyecto
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {creators.map((creator, index) => (
            <CreatorCard key={index} {...creator} />
          ))}
        </div>
      </main>
    </div>
  );
}
