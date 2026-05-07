import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  BookOpen,
  Wind,
  Activity,
  FileText,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { MOODS } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";

const quickActions = [
  {
    to: "/dashboard/chat",
    icon: MessageCircle,
    label: "Talk to Aasha",
    color: "bg-lavender-light text-primary",
  },

  {
    to: "/dashboard/journal",
    icon: BookOpen,
    label: "Write Journal",
    color: "bg-sky-light text-sky",
  },

  {
    to: "/dashboard/breathe",
    icon: Wind,
    label: "Breathe",
    color: "bg-aqua-light text-aqua",
  },

  {
    to: "/dashboard/mood",
    icon: Activity,
    label: "Track Mood",
    color: "bg-blush-light text-blush",
  },

  {
    to: "/dashboard/lab-reports",
    icon: FileText,
    label: "Lab Reports",
    color: "bg-success-light text-success",
  },
];

const DashboardHome = () => {
  const { user, session } = useAuth();

  const name =
    user?.user_metadata?.full_name?.split(" ")[0] || "there";

  const [entries, setEntries] = useState([]);

  const token = session?.access_token;

  /* FETCH JOURNALS */
  useEffect(() => {
    if (token) fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(
        "https://you-matter-backend.onrender.com/api/v1/journal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://you-matter-backend.onrender.com/api/v1/journal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEntries(
        entries.filter((e) => e._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  /* EDIT */
  const handleEdit = async (entry) => {
    const newContent = prompt(
      "Edit entry:",
      entry.content
    );

    if (!newContent) return;

    try {
      await axios.put(
        `https://you-matter-backend.onrender.com/api/v1/journal/${entry._id}`,
        {
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEntries();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-6 lg:px-8">
      
      {/* GREETING */}
      <div>
        <h1 className="font-heading text-2xl md:text-4xl font-bold">
          Hey {name}
        </h1>

        <p className="text-muted-foreground dark:text-white/70 font-body mt-1 text-sm md:text-base">
          How are you feeling today?
        </p>
      </div>

      {/* MOOD STRIP */}
      <div className="glass-card rounded-3xl p-4 md:p-6 border border-border/50">
        
        <h3 className="font-heading text-lg md:text-xl font-semibold mb-4">
          Quick mood check
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          
          {MOODS.map((m) => (
            <Link
              key={m.label}
              to="/dashboard/mood"
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all hover:scale-105 hover:shadow-md ${m.color}`}
            >
              <span className="text-xs font-medium">
                {m.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {quickActions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="glass-card rounded-3xl p-4 flex flex-col items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/40"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${a.color} flex items-center justify-center`}
            >
              <a.icon className="h-5 w-5" />
            </div>

            <span className="text-sm font-semibold text-center">
              {a.label}
            </span>
          </Link>
        ))}
      </div>

      {/* AASHA CARD */}
      <div className="relative overflow-hidden rounded-[32px] border border-border/50 bg-gradient-to-r from-lavender-light/40 to-sky-light/40 dark:from-primary/10 dark:to-sky-900/10 p-6 md:p-8 shadow-lg">
        
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          <div className="flex items-start gap-4">
            
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shrink-0">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>

            <div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2">
                Aasha is here for you
              </h3>

              <p className="text-sm md:text-base text-muted-foreground dark:text-white/70 leading-relaxed">
                Share what's on your mind.
                No judgment, just gentle
                support and understanding.
              </p>
            </div>
          </div>

          <Link to="/dashboard/chat">
            <Button
              size="lg"
              className="rounded-2xl px-8 shadow-lg w-full sm:w-auto"
            >
              Start a Conversation
            </Button>
          </Link>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* MOOD TREND */}
        <div className="glass-card rounded-3xl p-5 border border-border/50">
          
          <h3 className="font-heading text-lg font-semibold mb-2 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Mood Trend
          </h3>

          <p className="text-sm text-muted-foreground dark:text-white/70">
            Start tracking your moods to visualize emotional patterns.
          </p>

          <div className="mt-5 h-48 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted-foreground dark:text-white/50">
            Mood chart will appear here
          </div>
        </div>

        {/* JOURNALS */}
        <div className="glass-card rounded-3xl p-5 border border-border/50">
          
          <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Recent Journals
          </h3>

          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground dark:text-white/70">
              No journal entries yet
            </p>
          ) : (
            entries
              .slice(0, 3)
              .map((entry) => (
                <div
                  key={entry._id}
                  className="mb-4 border-b border-border pb-3"
                >
                  <p className="font-medium">
                    {entry.title}
                  </p>

                  <p className="text-sm text-muted-foreground dark:text-white/70 mt-1">
                    {entry.content}
                  </p>

                  <div className="flex gap-3 mt-2">
                    
                    <button
                      onClick={() =>
                        handleEdit(entry)
                      }
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(entry._id)
                      }
                      className="text-red-500 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;