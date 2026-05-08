import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Plus,
  BookOpen,
  X,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";

import { MOODS } from "@/types";

interface Entry {
  id: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
}

const Journal = () => {

  const [entries, setEntries] =
    useState<Entry[]>(() => {

      const saved =
        localStorage.getItem(
          "journal_entries"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [showForm, setShowForm] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [mood, setMood] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  /* LOADER */
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem(
      "journal_entries",
      JSON.stringify(entries)
    );
  }, [entries]);

  /* ADD / UPDATE ENTRY */
  const addEntry = () => {

    if (
      !title.trim() ||
      !content.trim()
    )
      return;

    if (editingId) {

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingId
            ? {
                ...entry,
                title:
                  title.trim(),

                content:
                  content.trim(),

                mood,
              }
            : entry
        )
      );

      setEditingId(null);

    } else {

      setEntries((prev) => [
        {
          id: Date.now().toString(),

          title:
            title.trim(),

          content:
            content.trim(),

          mood,

          created_at:
            new Date().toISOString(),
        },

        ...prev,
      ]);
    }

    setTitle("");

    setContent("");

    setMood("");

    setShowForm(false);
  };

  /* DELETE */
  const handleDelete = (
    id: string
  ) => {

    setEntries((prev) =>
      prev.filter(
        (entry) =>
          entry.id !== id
      )
    );
  };

  /* EDIT */
  const handleEdit = (
    entry: Entry
  ) => {

    setTitle(entry.title);

    setContent(entry.content);

    setMood(entry.mood);

    setEditingId(entry.id);

    setShowForm(true);
  };

  /* LOADING SCREEN */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <Loader2 className="h-10 w-10 animate-spin text-pink-500" />

          <p className="text-sm text-gray-500 dark:text-gray-300">
            Loading your journal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Journal
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Express yourself freely
          </p>
        </div>

        <Button
          onClick={() => {

            setShowForm(true);

            setEditingId(null);

            setTitle("");

            setContent("");

            setMood("");
          }}
          className="rounded-2xl px-5 py-2 bg-pink-500 hover:bg-pink-600 transition-all duration-300"
        >

          <Plus className="h-4 w-4 mr-1" />

          New Entry
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-6 shadow-xl space-y-4 animate-in slide-in-from-bottom duration-300">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">

              {editingId
                ? "Edit Entry"
                : "New Entry"}
            </h3>

            <button
              onClick={() =>
                setShowForm(false)
              }
              className="text-gray-400 hover:text-red-500 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* TITLE */}
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="rounded-2xl h-12"
          />

          {/* CONTENT */}
          <Textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            className="rounded-2xl min-h-[140px]"
          />

          {/* MOODS */}
          <div className="flex gap-2 flex-wrap">

            {MOODS.map((m) => (

              <button
                key={m.label}
                onClick={() =>
                  setMood(m.label)
                }
                className={`text-xl p-3 rounded-2xl transition-all duration-300 ${
                  mood === m.label
                    ? "bg-pink-100 dark:bg-pink-900/20 scale-110"
                    : "hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <Button
            onClick={addEntry}
            disabled={
              !title.trim() ||
              !content.trim()
            }
            className="rounded-2xl bg-pink-500 hover:bg-pink-600"
          >

            {editingId
              ? "Update Entry"
              : "Save Entry"}
          </Button>
        </div>
      )}

      {/* EMPTY */}
      {entries.length === 0 &&
      !showForm ? (

        <div className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-10 text-center shadow-xl">

          <BookOpen className="h-14 w-14 text-pink-400 mx-auto mb-4" />

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Your journal awaits
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Start writing to capture your thoughts and feelings.
          </p>

          <Button
            variant="secondary"
            onClick={() =>
              setShowForm(true)
            }
            className="rounded-2xl"
          >
            Write your first entry
          </Button>
        </div>

      ) : (

        <div className="space-y-4">

          {entries.map((e) => (

            <div
              key={e.id}
              className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {e.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">

                    {new Date(
                      e.created_at
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month:
                          "short",

                        day:
                          "numeric",

                        year:
                          "numeric",
                      }
                    )}

                    {e.mood &&
                      ` • ${e.mood}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      handleEdit(e)
                    }
                    className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <Pencil className="h-4 w-4 text-blue-500" />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        e.id
                      )
                    }
                    className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>

                  {/* MOOD */}
                  {e.mood && (
                    <span className="text-2xl">

                      {
                        MOODS.find(
                          (m) =>
                            m.label ===
                            e.mood
                        )?.emoji
                      }
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {e.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;