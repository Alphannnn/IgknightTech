"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginShell next="/admin" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  return <LoginShell next={next} />;
}

function LoginShell({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-[#0A1635] flex items-center justify-center px-5 relative overflow-hidden">

      {/* Background — dot grid + halos */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.32]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-[18%] left-[22%] w-[420px] h-[420px] rounded-full opacity-[0.25] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7BB6FF, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[20%] right-[20%] w-[380px] h-[380px] rounded-full opacity-[0.22] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #A78BFA, transparent 70%)",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
              style={{ background: "rgba(123,182,255,0.14)" }}
            >
              <ShieldCheck className="w-5 h-5 text-[#7BB6FF]" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200/70">
                Admin
              </div>
              <div className="text-white text-base font-semibold tracking-tight">
                Igknight Tech
              </div>
            </div>
          </div>

          <h1 className="mt-7 text-white text-3xl sm:text-[2rem] font-extrabold tracking-tight leading-tight">
            Sign in to continue.
          </h1>
          <p className="mt-2 text-blue-100/60 text-sm">
            This area manages meetings, availability, and content. Use the
            admin password.
          </p>

          <form action={action} className="mt-7 space-y-4">
            <input type="hidden" name="next" value={next} />

            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/60">
                Password
              </span>
              <div className="mt-2 relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/50" />
                <input
                  type="password"
                  name="password"
                  autoFocus
                  autoComplete="current-password"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-blue-200/35 focus:border-[#7BB6FF]/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-[#7BB6FF]/12 transition-all text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </label>

            {state.error && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-red-200 text-xs font-medium">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group w-full inline-flex items-center justify-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
            >
              {pending ? "Signing in…" : "Sign in"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-blue-200/40 text-xs">
          Igknight Tech · Admin · Protected area
        </p>
      </div>
    </div>
  );
}
