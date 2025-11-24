const users = [
  { id: 1, email: "owner@bbqgali.pk", tier: "Starter", role: "owner", restaurant: "BBQ Gali" },
  { id: 2, email: "admin@hsreview.pk", tier: "Starter", role: "admin", restaurant: "-" },
];

const restaurants = [
  { id: 1, name: "BBQ Gali", city: "Karachi", status: "Syncing" },
  { id: 2, name: "Bundu Khan", city: "Lahore", status: "Healthy" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Admin
        </p>
        <h1 className="text-3xl font-bold text-slate-950">Control panel</h1>
        <p className="text-sm text-slate-600">
          Manage roles, subscription tiers, and sync status. Upgrades are manual after payment confirmation.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
            Add admin
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Tier</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Restaurant</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {user.email}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{user.tier}</td>
                  <td className="py-3 pr-4 text-slate-700">{user.role}</td>
                  <td className="py-3 pr-4 text-slate-700">{user.restaurant}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-2">
                      <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
                        Upgrade tier
                      </button>
                      <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
                        Toggle role
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Restaurants</h2>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
            Refresh sync
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">City</th>
                <th className="py-2 pr-4">Sync status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {r.name}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{r.city}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
                      View logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
