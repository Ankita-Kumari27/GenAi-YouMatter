import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Activity,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Angry,
  Laugh,
  Trash2,
} from "lucide-react";

import { MOODS } from "@/types";

interface MoodLog {
  id: string;
  mood: string;
  score: number;
  created_at: string;
}

const moodIcons = {
  Happy: Laugh,
  Calm: Smile,
  Neutral: Meh,
  Sad: Frown,
  Angry: Angry,
};

const MoodTracker = () => {

  const [logs, setLogs] =
    useState<MoodLog[]>(() => {

      const saved =
        localStorage.getItem(
          "mood_logs"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [selected, setSelected] =
    useState<
      (typeof MOODS)[number] | null
    >(null);

  /* SAVE HISTORY */
  useEffect(() => {
    localStorage.setItem(
      "mood_logs",
      JSON.stringify(logs)
    );
  }, [logs]);

  /* LOG MOOD */
  const logMood = () => {

    if (!selected) return;

    setLogs((prev) => [
      {
        id: Date.now().toString(),

        mood: selected.label,

        score: selected.score,

        created_at:
          new Date().toISOString(),
      },

      ...prev,
    ]);

    setSelected(null);
  };

  /* DELETE MOOD */
  const deleteMood = (
    id: string
  ) => {

    setLogs((prev) =>
      prev.filter(
        (log) => log.id !== id
      )
    );
  };

  /* DYNAMIC GRADIENT */
  const moodGradient =
    selected?.score >= 4
      ? "from-green-300 via-emerald-200 to-teal-200 dark:from-green-900/20 dark:to-teal-900/20"
      : selected?.score === 3
      ? "from-yellow-200 via-orange-100 to-pink-100 dark:from-yellow-900/20 dark:to-pink-900/20"
      : selected?.score
      ? "from-pink-200 via-rose-100 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/20"
      : "from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:to-[#1e1b4b]";

  return (
    <div
      className={`space-y-6 min-h-screen rounded-3xl p-4 md:p-6 bg-gradient-to-br ${moodGradient} transition-all duration-700 animate-in fade-in`}
    >

      {/* HEADER */}
      <div>

        <div className="flex items-center gap-2 mb-2">

          <Sparkles className="h-5 w-5 text-pink-500 animate-pulse" />

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Mood Tracker
          </h1>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          How are you feeling right now?
        </p>
      </div>

      {/* SELECTOR */}
      <div className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-6 text-center shadow-xl transition-all duration-500">

        <div className="flex flex-wrap gap-4 justify-center mb-6">

          {MOODS.map((m) => {

            const Icon =
              moodIcons[
                m.label as keyof typeof moodIcons
              ] || Smile;

            return (
              <button
                key={m.label}
                onClick={() =>
                  setSelected(m)
                }
                className={`flex flex-col items-center gap-3 p-4 rounded-3xl transition-all duration-300 ${
                  selected?.label ===
                  m.label
                    ? "bg-pink-100 dark:bg-pink-900/20 scale-110 shadow-2xl rotate-2"
                    : "hover:bg-white/60 dark:hover:bg-white/10 hover:scale-105"
                }`}
              >

                <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/10 shadow-md">

                  <Icon className="h-8 w-8 text-pink-500" />
                </div>

                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          onClick={logMood}
          disabled={!selected}
          className="rounded-2xl px-8 py-6 text-base bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-105"
        >
          Log Mood
        </Button>
      </div>

      {/* CHART */}
      {logs.length > 1 && (

        <div className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-5 shadow-xl animate-in slide-in-from-bottom duration-500">

          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Recent Mood Trend
          </h3>

          <svg
            viewBox="0 0 300 100"
            className="w-full h-28"
          >

            <defs>

              <linearGradient
                id="moodGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="rgb(236 72 153)"
                  stopOpacity="0.4"
                />

                <stop
                  offset="100%"
                  stopColor="rgb(236 72 153)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {(() => {

              const recent =
                logs
                  .slice(0, 10)
                  .reverse();

              const points =
                recent.map(
                  (l, i) => ({
                    x:
                      (i /
                        (recent.length -
                          1)) *
                        280 +
                      10,

                    y:
                      90 -
                      ((l.score -
                        1) /
                        4) *
                        70,
                  })
                );

              const line =
                points
                  .map(
                    (p) =>
                      `${p.x},${p.y}`
                  )
                  .join(" ");

              const area =
                `${points[0].x},90 ${line} ${points[points.length - 1].x},90`;

              return (
                <>
                  <polygon
                    points={area}
                    fill="url(#moodGrad)"
                  />

                  <polyline
                    points={line}
                    fill="none"
                    stroke="rgb(236 72 153)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {points.map(
                    (p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="white"
                        stroke="rgb(236 72 153)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    )
                  )}
                </>
              );
            })()}
          </svg>
        </div>
      )}

      {/* HISTORY */}
      {logs.length === 0 ? (

        <div className="rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-12 text-center shadow-xl animate-in zoom-in duration-500">

          <Activity className="h-14 w-14 text-pink-400 mx-auto mb-4 animate-pulse" />

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Start tracking your moods
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            Select how you're feeling to begin building your emotional awareness.
          </p>
        </div>

      ) : (

        <div className="space-y-3">

          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Mood History
          </h3>

          {logs.map((l, index) => {

            const Icon =
              moodIcons[
                l.mood as keyof typeof moodIcons
              ] || Smile;

            return (
              <div
                key={l.id}
                className="rounded-2xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between shadow-lg hover:scale-[1.02] transition-all duration-300 animate-in slide-in-from-bottom"
                style={{
                  animationDelay:
                    `${index * 50}ms`,
                }}
              >

                <div className="flex items-center gap-3">

                  <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-900/20">

                    <Icon className="h-5 w-5 text-pink-500" />
                  </div>

                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {l.mood}
                  </span>
                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xs text-gray-500 dark:text-gray-400">

                    {new Date(
                      l.created_at
                    ).toLocaleTimeString(
                      "en-US",
                      {
                        hour:
                          "numeric",

                        minute:
                          "2-digit",
                      }
                    )}
                  </span>

                  <button
                    onClick={() =>
                      deleteMood(l.id)
                    }
                    className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;