import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Heart,
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  Activity,
  Wind,
  FileText,
  User,
  LogOut,
  Phone,
} from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/dashboard/chat", icon: MessageCircle, label: "Chat" },
  { to: "/dashboard/journal", icon: BookOpen, label: "Journal" },
  { to: "/dashboard/mood", icon: Activity, label: "Mood" },
  { to: "/dashboard/breathe", icon: Wind, label: "Breathe" },
  { to: "/dashboard/lab-reports", icon: FileText, label: "Lab Reports" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500 overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl border-r border-border fixed inset-y-0 left-0 z-40 shadow-xl">
        
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <Heart className="h-6 w-6 text-pink-500 fill-pink-300" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            YouMatter
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map((item) => {
            const active =
              pathname === item.to ||
              (item.to !== "/dashboard" && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] ${
                  active
                    ? "bg-pink-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 space-y-2 border-t border-border">
          <a
            href="tel:988"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
          >
            <Phone className="h-4 w-4" />
            Crisis Line: 988
          </a>

          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            {t("Sign Out")}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-0">
        
        {/* TOPBAR */}
        <div className="flex justify-between items-center p-4 md:p-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
            YouMatter
          </h1>

          <div className="flex items-center gap-2 bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md">
            <DarkModeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <div className="animate-in fade-in duration-500">
            <Outlet />
          </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#111827]/90 backdrop-blur-xl border-t border-border z-50 shadow-2xl">
        
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 5).map((item) => {
            const active =
              pathname === item.to ||
              (item.to !== "/dashboard" && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] transition-all ${
                  active
                    ? "text-pink-500 scale-105"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}