import LoginForm from "@/src/components/auth/loginform";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Nav ── */}
      {/* <nav className="flex items-center justify-between px-8 py-5">
        <span className="text-base font-black text-[#0f1b4c] tracking-tight">
          HyperFocus Habit
        </span>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-[#0f1b4c] transition-colors">
            Methodology
          </a>
          <a href="#" className="hover:text-[#0f1b4c] transition-colors">
            Pricing
          </a>
        </div>
      </nav> */}

      {/* ── Body ── */}
      <div className="flex flex-2">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-center px-16 flex-1 bg-gradient-to-br from-[#eef0f8] to-[#dde2f4]">
          <h1 className="text-5xl font-black text-[#0f1b4c] leading-tight mb-4">
            Track with progress with
            <br />
            <span className="text-blue-600 italic">SMD APP.</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-10">
            The Kinetic Ledger approach to habit formation.
            <br />
            Pure data, editorial clarity, and zero friction.
          </p>

          {/* Feature pills */}
          <div className="flex gap-6">
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 flex flex-col gap-2 max-w-[140px]">
              <TrendIcon />
              <p className="text-xs font-bold text-[#0f1b4c]">Data First</p>
              <p className="text-[11px] text-gray-400 leading-snug">
                Deep analytics for every routine performed.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 flex flex-col gap-2 max-w-[140px]">
              <BoltIcon />
              <p className="text-xs font-bold text-[#0f1b4c]">Zero Lag</p>
              <p className="text-[11px] text-gray-400 leading-snug">
                Optimised for high-frequency habit entry.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel — form card */}
        <div className="flex items-center justify-center w-full md:w-auto md:min-w-[420px] px-6 py-12 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-bold text-[#0f1b4c] mb-1">
              Account Access
            </h2>
            <p className="text-xs text-gray-400 mb-7">
              Enter your credentials to sync your ledger
            </p>

            <LoginForm />

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] ">
                Create new account{" "}
                <Link className="pl-2.5 underline" href="/signup">
                  Sign up
                </Link>
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* <p className="text-center text-xs text-gray-400">
              New to HyperFocus?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Initialize Ledger
              </Link>
            </p> */}

            {/* Live activity badge */}
            {/* <div className="mt-8 border border-gray-100 rounded-xl p-3 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5 shrink-0 animate-pulse" />
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  Real-Time Activity
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                  12,402 users initialized their first habit in the last 10
                  minutes.*
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      {/* <footer className="flex items-center justify-between px-8 py-4 text-[10px] text-gray-300 border-t border-gray-100">
        <span>© 2024 HYPERFOCUS HABIT. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-4">
          <span>SYSTEM STATUS: OPTIMAL</span>
          <a href="#" className="hover:text-gray-500">
            PRIVACY POLICY
          </a>
          <a href="#" className="hover:text-gray-500">
            TERMS OF SERVICE
          </a>
        </div>
      </footer> */}
    </main>
  );
}

/* ── Icons ── */
function TrendIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#3b82f6"
      strokeWidth={2.5}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#3b82f6"
      strokeWidth={2.5}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
