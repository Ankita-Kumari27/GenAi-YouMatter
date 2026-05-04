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
    <div className="min-h-screen cloud-bg flex">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 glass-card-strong border-r border-border fixed inset-y-0 left-0 z-40">
        <div className="p-6 flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary/30" />
          <span className="font-heading text-lg font-bold">YouMatter</span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.to ||
              (item.to !== "/dashboard" && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body transition-all ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 space-y-1">
          <a
            href="tel:988"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-destructive hover:bg-destructive/10 transition-all"
          >
            <Phone className="h-4 w-4" />
            Crisis Line: 988
          </a>

          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <LogOut className="h-4 w-4" />
            {t("Sign Out")}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        <div className="flex justify-end p-4 md:p-6 lg:p-8">
          <div className="flex gap-2 bg-muted/50 backdrop-blur px-3 py-2 rounded-xl shadow">
            <DarkModeToggle />
            <LanguageToggle />
          </div>
        </div>

        <div className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card-strong border-t border-border z-40">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const active =
              pathname === item.to ||
              (item.to !== "/dashboard" && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-body transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
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