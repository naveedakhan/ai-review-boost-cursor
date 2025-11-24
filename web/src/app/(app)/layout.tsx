import Link from "next/link";
import { signOutAction } from "@/lib/auth";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/reviews", label: "Reviews" },
  { href: "/requests", label: "Requests" },
  { href: "/customers", label: "Customers" },
  { href: "/admin", label: "Admin" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-lg font-semibold text-slate-900">
            HS Review Booster
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-700 transition hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={signOutAction}>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
