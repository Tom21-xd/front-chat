import { Copyright, Users } from "lucide-react";
import Link from "next/link";

export const SidebarFooter = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className="mt-auto pt-4 border-t border-gray-700 text-gray-400 text-xs">
      <Link
        href="/creadores"
        className="flex items-center justify-center sm:justify-start gap-2 px-2 py-1 rounded hover:bg-gray-700 transition"
        title="Creadores"
      >
        <Users className="w-4 h-4" />
        {!collapsed && <span>Creadores</span>}
      </Link>

      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "gap-1"
        } px-2 pt-2`}
      >
        <Copyright className="w-3 h-3" />
        {!collapsed && <span className="text-xs">2025 ChatJMS</span>}
      </div>
    </div>
  );
};
