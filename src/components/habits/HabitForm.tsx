"use client";
import { useState } from "react";
import { validateHabitName } from "@/src/lib/validators";
import type { Habit } from "@/src/types/habit";

interface Props {
  initial?: Habit;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export default function HabitForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateHabitName(name);
    if (!result.valid) {
      setError(result.error!);
      return;
    }
    onSave(result.value, description);
  };

  return (
    <form
      data-testid="habit-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 border rounded-xl bg-white"
    >
      {error && (
        <p role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
      <label htmlFor="habit-name" className="text-sm font-medium">
        Name
      </label>
      <input
        id="habit-name"
        data-testid="habit-name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      />
      <label htmlFor="habit-desc" className="text-sm font-medium">
        Description
      </label>
      <input
        id="habit-desc"
        data-testid="habit-description-input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      />
      <label htmlFor="habit-freq" className="text-sm font-medium">
        Frequency
      </label>
      <select
        id="habit-freq"
        data-testid="habit-frequency-select"
        value="daily"
        // readOnly
        className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
      >
        <option value="daily">Daily</option>
      </select>
      <div className="flex gap-2 mt-1">
        <button
          data-testid="habit-save-button"
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border py-2 rounded-lg font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
