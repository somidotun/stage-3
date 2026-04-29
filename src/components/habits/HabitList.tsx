"use client";
import type { Habit } from "@/src/types/habit";
import HabitCard from "./HabitCard";

interface Props {
  habits: Habit[];
  onUpdate: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onUpdate, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
