"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSession,
  clearSession,
  getHabitsForUser,
  createHabit,
} from "@/src/lib/storage";
import type { Habit } from "@/src/types/habit";
import HabitForm from "@/src/components/habits/HabitForm";
import HabitCard from "@/src/components/habits/HabitCard";
import { calculateCurrentStreak } from "@/src/lib/streaks";

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [session, setSession] = useState<{
    userId: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setSession(s);
    setHabits(getHabitsForUser(s.userId));
  }, [router]);

  if (!session) return null;

  const handleCreate = (name: string, description: string) => {
    const habit = createHabit(session.userId, name, description);
    setHabits((prev) => [...prev, habit]);
    setShowForm(false);
  };

  const handleUpdate = (updated: Habit) =>
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));

  const handleDelete = (id: string) =>
    setHabits((prev) => prev.filter((h) => h.id !== id));

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  const today = new Date().toISOString().split("T")[0];
  const totalStreak = habits.reduce(
    (max, h) => Math.max(max, calculateCurrentStreak(h.completions, today)),
    0,
  );
  const completedToday = habits.filter((h) =>
    h.completions.includes(today),
  ).length;
  const consistencyScore =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const userInitial = session.email.charAt(0).toUpperCase();

  return (
    <div
      data-testid="dashboard-page"
      className="flex min-h-screen bg-[#f4f5f7] font-sans"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0f1b4c] text-white min-h-screen py-8 px-4 fixed left-0 top-0 bottom-0 z-20">
        {/* Brand */}
        <div className="mb-10 px-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-300 opacity-70">
            Editorial
          </span>
          <p className="text-lg font-bold text-white leading-tight mt-0.5">
            Habit
          </p>
        </div>

        {/* User */}
        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {session.email.split("@")[0]}
              </p>
              <p className="text-[10px] text-blue-300/60">Focus Mode Active</p>
            </div>
          </div>
          <button
            data-testid="auth-logout-button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-xs text-blue-200/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-56 p-6 md:p-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
              Today&apos;s Focus
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-[#0f1b4c] leading-tight">
              Precision in <span className="italic text-blue-600">Action.</span>
            </h1>
          </div>

          <button
            data-testid="create-habit-button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#0f1b4c] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors shadow-md"
          >
            <span className="text-lg leading-none">+</span>
            New Habit
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Streak card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Current Streak
              </span>
              <FlameIcon />
            </div>
            <p className="text-5xl font-black text-[#0f1b4c]">{totalStreak}</p>
            <p className="text-sm text-gray-400 mt-1">days</p>
            <p className="text-xs text-gray-400 mt-3 leading-snug">
              {totalStreak > 0
                ? "You're in the top 5% of habit builders this week. Keep the momentum."
                : "Start your first habit to build a streak."}
            </p>
          </div>

          {/* Consistency score */}
          <div className="bg-[#0f1b4c] rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center">
            <TrendIcon />
            <p className="text-4xl font-black text-white mt-3">
              {consistencyScore}%
            </p>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300/60 mt-1">
              Consistency Score
            </p>
          </div>
        </div>

        {/* Habit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#0f1b4c]">
                  New Discipline
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  Add a new habit to track daily
                </p>
              </div>
              <div className="p-6">
                <HabitForm
                  onSave={handleCreate}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Habits section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#0f1b4c]">
            Active Disciplines
          </h2>
          <span className="text-xs text-gray-400">
            {habits.length} active habit{habits.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Empty state */}
        {habits.length === 0 && !showForm && (
          <div
            data-testid="empty-state"
            className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-300">+</span>
            </div>
            <p className="text-sm font-semibold text-gray-400">
              Initiate New Pursuit
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Architect your future self
            </p>
          </div>
        )}

        {/* Habit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}

          {/* Add new card placeholder */}
          {habits.length > 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
            >
              <span className="text-2xl text-gray-300 group-hover:text-blue-400 transition-colors">
                +
              </span>
              <p className="text-xs font-semibold text-gray-300 group-hover:text-blue-400 mt-2 transition-colors">
                Initiate New Pursuit
              </p>
              <p className="text-[10px] text-gray-200 group-hover:text-blue-300 mt-0.5 transition-colors">
                Architect your future self
              </p>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

/* ── Icons ── */
function LogoutIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#3b82f6"
      strokeWidth={2}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
