import type { User, Session } from "@/src/types/auth";
import type { Habit } from "@/src/types/habit";
import { STORAGE_KEYS } from "@/src/lib/constants";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

function readSession<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(sessionStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Users
export const getUsers = (): User[] => read<User[]>(STORAGE_KEYS.USERS) ?? [];
export const saveUsers = (users: User[]) => write(STORAGE_KEYS.USERS, users);
export const findUserByEmail = (email: string) =>
  getUsers().find((u) => normalizeEmail(u.email) === normalizeEmail(email)) ??
  null;
export function createUser(email: string, password: string): User {
  const user: User = {
    id: crypto.randomUUID(),
    email: normalizeEmail(email),
    password,
    createdAt: new Date().toISOString(),
  };
  saveUsers([...getUsers(), user]);
  return user;
}

// Session
export const getSession = (): Session | null =>
  read<Session>(STORAGE_KEYS.SESSION) ??
  readSession<Session>(STORAGE_KEYS.SESSION);
export const saveSession = (session: Session | null, persist = true) => {
  if (persist) {
    write(STORAGE_KEYS.SESSION, session);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    }
    return;
  }
  remove(STORAGE_KEYS.SESSION);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }
};
export const clearSession = () => {
  remove(STORAGE_KEYS.SESSION);
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  }
};

// Habits
export const getHabits = (): Habit[] =>
  read<Habit[]>(STORAGE_KEYS.HABITS) ?? [];
export const saveHabits = (habits: Habit[]) =>
  write(STORAGE_KEYS.HABITS, habits);
export const getHabitsForUser = (userId: string) =>
  getHabits().filter((h) => h.userId === userId);
export function createHabit(
  userId: string,
  name: string,
  description: string,
): Habit {
  const habit: Habit = {
    id: crypto.randomUUID(),
    userId,
    name,
    description,
    frequency: "daily",
    createdAt: new Date().toISOString(),
    completions: [],
  };
  saveHabits([...getHabits(), habit]);
  return habit;
}
export function updateHabit(updated: Habit): void {
  saveHabits(getHabits().map((h) => (h.id === updated.id ? updated : h)));
}
export function deleteHabit(id: string): void {
  saveHabits(getHabits().filter((h) => h.id !== id));
}
