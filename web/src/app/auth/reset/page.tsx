import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

async function updatePasswordAction(formData: FormData) {
  "use server";

  const parsed = z
    .object({ password: z.string().min(6) })
    .safeParse({ password: formData.get("password") });

  if (!parsed.success) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Set new password
          </p>
          <h1 className="text-3xl font-bold text-slate-950">Update your password</h1>
          <p className="text-sm text-slate-600">
            This link only works once. Choose a strong password to continue.
          </p>
        </div>
        <form action={updatePasswordAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-800" htmlFor="password">
              New password
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
            Save and continue
          </button>
        </form>
      </div>
    </div>
  );
}
