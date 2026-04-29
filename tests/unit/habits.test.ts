import { describe, it, expect } from "vitest";
import { toggleHabitCompletion } from "@/lib/habits";
import type { Habit } from "@/types/habit";

const base: Habit = {
  id: "1",
  userId: "u1",
  name: "Test",
  description: "",
  frequency: "daily",
  createdAt: "2025-01-01",
  completions: [],
};

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const result = toggleHabitCompletion(base, "2025-01-10");
    expect(result.completions).toContain("2025-01-10");
  });
  it("removes a completion date when the date already exists", () => {
    const habit = { ...base, completions: ["2025-01-10"] };
    const result = toggleHabitCompletion(habit, "2025-01-10");
    expect(result.completions).not.toContain("2025-01-10");
  });
  it("does not mutate the original habit object", () => {
    const original = { ...base, completions: ["2025-01-10"] };
    toggleHabitCompletion(original, "2025-01-11");
    expect(original.completions).toEqual(["2025-01-10"]);
  });
  it("does not return duplicate completion dates", () => {
    const habit = { ...base, completions: ["2025-01-10", "2025-01-10"] };
    const result = toggleHabitCompletion(habit, "2025-01-11");
    const unique = new Set(result.completions);
    expect(unique.size).toBe(result.completions.length);
  });
});
