import SignupForm from "@/src/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#eef0f8] to-[#dde2f4]"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Body ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-4xl gap-10 items-center">
          {/* ── Left panel ── */}
          <div className="hidden md:flex flex-col flex-1 pr-8">
            {/* Badge */}
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit mb-6">
              SMD APP
            </span>

            <h1 className="text-5xl font-black text-[#0f1b4c] leading-tight mb-4">
              Master your{" "}
              <span className="text-blue-600 italic">rhythm.</span>{" "}
            </h1>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-10">
              The SMD Habit ledger treats your day like a premium publication.
              Stripped of noise, built for professional precision.
            </p>

            {/* Feature cards */}
            <div className="flex gap-5 mb-12">
              <div className="bg-white/60 backdrop-blur rounded-2xl p-4 flex flex-col gap-2 max-w-[150px]">
                <LedgerIcon />
                <p className="text-xs font-bold text-[#0f1b4c]">
                  The Ledger Logic
                </p>
                <p className="text-[11px] text-gray-400 leading-snug">
                  Visualizing progress as a series of high-impact headlines
                  rather than cluttered lists.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-2xl p-4 flex flex-col gap-2 max-w-[150px]">
                <BoltIcon />
                <p className="text-xs font-bold text-[#0f1b4c]">
                  Frictionless Focus
                </p>
                <p className="text-[11px] text-gray-400 leading-snug">
                  A minimal interface designed to get out of your way and let
                  the work speak for itself.
                </p>
              </div>
            </div>

            {/* Brand lockup */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BookIcon />
              </div>
              <div>
                <p className="text-xs font-black text-blue-600 leading-tight">
                  SMD Habit
                </p>
                <p className="text-[10px] tracking-widest uppercase text-gray-400">
                  Editorial Productivity
                </p>
              </div>
            </div>
          </div>

          {/* ── Right panel — form card ── */}
          <div className="w-full md:w-[380px] bg-white rounded-3xl shadow-xl p-8 shrink-0">
            <h2 className="text-xl font-bold text-[#0f1b4c] mb-1">
              Create your account
            </h2>
            {/* <p className="text-xs text-gray-400 mb-7">
              Start your 14-day focus trial today.
            </p> */}

            <SignupForm />

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 mb-3">
                Already have a ledger?
              </p>
              <Link
                href="/login"
                className="block w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-[#0f1b4c] hover:bg-gray-50 transition-colors text-center"
              >
                Login in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Icons ── */
function LedgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#3b82f6"
      strokeWidth={2}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#3b82f6"
      strokeWidth={2}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
