"use client";
import { useState } from "react";
import HabitForm from "./HabitForm";
import { Habit } from "@/src/types/habit";
import { getHabitSlug } from "@/src/lib/slug";
import { calculateCurrentStreak } from "@/src/lib/streaks";
import { toggleHabitCompletion } from "@/src/lib/habits";
import { deleteHabit, updateHabit } from "@/src/lib/storage";

interface Props {
  habit: Habit;
  onUpdate: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

const HABIT_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function getHabitColor(id: string) {
  const index = id.charCodeAt(0) % HABIT_COLORS.length;
  return HABIT_COLORS[index];
}

export default function HabitCard({ habit, onUpdate, onDelete }: Props) {
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().split("T")[0];
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(habit);

  const streak = calculateCurrentStreak(currentHabit.completions, today);
  const isComplete = currentHabit.completions.includes(today);
  const colorClass = getHabitColor(habit.id);

  const handleToggle = () => {
    const updated = toggleHabitCompletion(currentHabit, today);
    updateHabit(updated);
    setCurrentHabit(updated);
    onUpdate(updated);
  };

  const handleSave = (name: string, description: string) => {
    const updated: Habit = { ...currentHabit, name, description };
    updateHabit(updated);
    setCurrentHabit(updated);
    onUpdate(updated);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteHabit(currentHabit.id);
    onDelete(currentHabit.id);
  };

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <HabitForm
          initial={currentHabit}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon avatar */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${colorClass}`}
          >
            {currentHabit.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-[#0f1b4c] leading-tight">
              {currentHabit.name}
            </p>
            {currentHabit.description && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                {currentHabit.description} · Daily
              </p>
            )}
            {!currentHabit.description && (
              <p className="text-[11px] text-gray-400 mt-0.5">Daily</p>
            )}
          </div>
        </div>

        {/* Edit / Delete controls */}
        <div className="flex items-center gap-1">
          {confirmDelete ? (
            <>
              <button
                data-testid="confirm-delete-button"
                onClick={handleDelete}
                className="text-[11px] font-semibold text-white bg-red-500 px-2 py-1 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-[11px] text-gray-400 px-2 py-1 rounded-lg border"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                data-testid={`habit-edit-${slug}`}
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Edit habit"
              >
                <EditIcon />
              </button>
              <button
                data-testid={`habit-delete-${slug}`}
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Delete habit"
              >
                <TrashIcon />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Streak bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            data-testid={`habit-streak-${slug}`}
            className="text-sm font-black text-[#0f1b4c]"
          >
            {streak}
          </span>
          <span className="text-xs text-gray-400">
            {streak === 1 ? "day streak" : "days streak"}
          </span>
        </div>

        {/* Complete button */}
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={handleToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isComplete
              ? "bg-emerald-500 text-white"
              : "border border-[#0f1b4c] text-[#0f1b4c] hover:bg-[#0f1b4c] hover:text-white"
          }`}
        >
          {isComplete ? (
            <>
              <CheckIcon />
              Complete
            </>
          ) : (
            <>
              <LogSessionIcon />
              Log Session
            </>
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete ? "bg-emerald-400 w-full" : "bg-blue-200 w-1/3"
          }`}
        />
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LogSessionIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
