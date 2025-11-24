import Link from "next/link";
import { signUpAction, googleSignInAction } from "@/lib/auth";

async function handleSignUp(formData: FormData) {
  "use server";
  await signUpAction(formData);
}

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
      <div className="grid w-full gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            HS Review Booster
          </p>
          <h1 className="text-3xl font-bold text-slate-950">
            Create your account
          </h1>
          <p className="text-sm text-slate-600">
            You&apos;ll manage one restaurant during the MVP. Upgrade is manual after payment confirmation.
          </p>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            Starter includes 200 SMS/month. Free includes 50 SMS/month. Sending stops once limits are hit.
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
          <form action={handleSignUp} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800" htmlFor="email">
                Work email
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
            <div>
              <label className="text-sm font-medium text-slate-800" htmlFor="password">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Create account
            </button>
          </form>

          <div className="mt-4">
            <form action={googleSignInAction}>
              <button
                type="submit"
                className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-700"
              >
                Continue with Google
              </button>
            </form>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link className="text-slate-700 hover:underline" href="/login">
              Already have an account?
            </Link>
            <Link className="text-brand-700 hover:underline" href="/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
