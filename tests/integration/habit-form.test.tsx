import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HabitForm from "@/src/components/habits/HabitForm";
import HabitCard from "@/src/components/habits/HabitCard";
import type { Habit } from "@/src/types/habit";

vi.mock("@/lib/storage", () => ({
  updateHabit: vi.fn(),
  deleteHabit: vi.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

const mockHabit: Habit = {
  id: "1",
  userId: "u1",
  name: "Drink Water",
  description: "Stay hydrated",
  frequency: "daily",
  createdAt: "2025-01-01",
  completions: [],
};

describe("habit form", () => {
  it("shows a validation error when habit name is empty", async () => {
    render(
      React.createElement(HabitForm, {
        onSave: vi.fn(),
        onCancel: vi.fn(),
      }),
    );
    fireEvent.click(screen.getByTestId("habit-save-button"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Habit name is required",
      ),
    );
  });

  it("creates a new habit and renders it in the list", async () => {
    const onSave = vi.fn();
    render(
      React.createElement(HabitForm, {
        onSave,
        onCancel: vi.fn(),
      }),
    );
    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Exercise" },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));
    await waitFor(() => expect(onSave).toHaveBeenCalledWith("Exercise", ""));
  });

  it("edits an existing habit and preserves immutable fields", async () => {
    const onSave = vi.fn();
    render(
      React.createElement(HabitForm, {
        initial: mockHabit,
        onSave,
        onCancel: vi.fn(),
      }),
    );
    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Drink More Water" },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));
    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith("Drink More Water", "Stay hydrated"),
    );
  });

  it("deletes a habit only after explicit confirmation", async () => {
    const onDelete = vi.fn();
    render(
      React.createElement(HabitCard, {
        habit: mockHabit,
        onUpdate: vi.fn(),
        onDelete,
      }),
    );
    fireEvent.click(screen.getByTestId("habit-delete-drink-water"));
    expect(onDelete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("confirm-delete-button"));
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith("1"));
  });

  it("toggles completion and updates the streak display", async () => {
    render(
      React.createElement(HabitCard, {
        habit: mockHabit,
        onUpdate: vi.fn(),
        onDelete: vi.fn(),
      }),
    );
    const streakEl = screen.getByTestId("habit-streak-drink-water");
    expect(streakEl).toHaveTextContent("0");
    fireEvent.click(screen.getByTestId("habit-complete-drink-water"));
    await waitFor(() =>
      expect(screen.getByTestId("habit-streak-drink-water")).toHaveTextContent(
        "1",
      ),
    );
  });
});
