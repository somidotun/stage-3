import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "@/src/components/auth/SignupForm";
import LoginForm from "@/src/components/auth/loginform";
import { saveUsers } from "@/src/lib/storage";
import type { User } from "@/src/types/auth";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("auth flow", () => {
  it("submits the signup form and creates a session", async () => {
    render(React.createElement(SignupForm));
    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "a@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "pass123" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-terms"));
    fireEvent.click(screen.getByTestId("auth-signup-submit"));
    await waitFor(() => {
      const session = JSON.parse(
        localStorage.getItem("habit-tracker-session") ?? "null",
      );
      expect(session).not.toBeNull();
      expect(session.email).toBe("a@test.com");
    });
  });

  it("shows an error for duplicate signup email", async () => {
    const existing: User = {
      id: "1",
      email: "a@test.com",
      password: "pass",
      createdAt: "",
    };
    saveUsers([existing]);
    render(React.createElement(SignupForm));
    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "a@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "pass123" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-terms"));
    fireEvent.click(screen.getByTestId("auth-signup-submit"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "User already exists",
      ),
    );
  });

  it("submits the login form and stores the active session", async () => {
    const existing: User = {
      id: "1",
      email: "b@test.com",
      password: "pass123",
      createdAt: "",
    };
    saveUsers([existing]);
    render(React.createElement(LoginForm));
    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "b@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "pass123" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));
    await waitFor(() => {
      const session = JSON.parse(
        sessionStorage.getItem("habit-tracker-session") ?? "null",
      );
      expect(session?.email).toBe("b@test.com");
    });
  });

  it("shows an error for invalid login credentials", async () => {
    render(React.createElement(LoginForm));
    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "nobody@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Invalid email or password",
      ),
    );
  });
});
