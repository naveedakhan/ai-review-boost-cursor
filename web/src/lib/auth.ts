"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabaseClient } from "./supabase/server";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signUpAction(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password (6+ chars)." };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: { role: "owner" },
    },
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signInAction(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password (6+ chars)." };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function googleSignInAction() {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    // Surface as a thrown error so the action signature remains void.
    throw new Error(error.message);
  }
}

export async function resetPasswordAction(formData: FormData) {
  const parsed = z
    .object({ email: z.string().email() })
    .safeParse({ email: formData.get("email") });

  if (!parsed.success) return { error: "Enter a valid email." };

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`,
    },
  );

  if (error) return { error: error.message };

  return { success: "Reset link sent." };
}
