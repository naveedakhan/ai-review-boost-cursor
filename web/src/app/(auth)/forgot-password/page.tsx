import Link from "next/link";
import { resetPasswordAction } from "@/lib/auth";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Reset password
          </p>
          <h1 className="text-3xl font-bold text-slate-950">We&apos;ll send you a link</h1>
          <p className="text-sm text-slate-600">
            Enter the email you use for HS Review Booster. You&apos;ll receive a reset link.
          </p>
        </div>
        <form action={resetPasswordAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-800" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="you@restaurant.pk"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Send reset link
          </button>
        </form>
        <div className="flex items-center justify-between text-sm">
          <Link href="/login" className="text-slate-700 hover:underline">
            Back to login
          </Link>
          <Link href="/signup" className="text-brand-700 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
