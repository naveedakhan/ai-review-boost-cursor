const requests = [
  {
    id: 1,
    name: "Ahmed Khan",
    phone: "+92 300 1234567",
    status: "Sent",
    sentAt: "Nov 21, 7:15pm",
    link: "hs.pk/r/abcd",
  },
  {
    id: 2,
    name: "Fatima Ali",
    phone: "+92 321 9876543",
    status: "Clicked",
    sentAt: "Nov 21, 7:10pm",
    link: "hs.pk/r/efgh",
  },
];

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Requests
          </p>
          <h1 className="text-3xl font-bold text-slate-950">SMS review requests</h1>
          <p className="text-sm text-slate-600">
            Add customers manually or upload CSV (name, phone, email optional). Sending stops at plan limit.
          </p>
        </div>
        <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-brand-700">
          120 / 200 SMS used
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <form className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Customer name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="phone">
              Phone (Pakistan)
            </label>
            <input
              id="phone"
              name="phone"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="+92 3XX XXX XXXX"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="email">
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="customer@email.com"
            />
          </div>
          <div className="md:col-span-3 flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Send SMS
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700"
            >
              Upload CSV
            </button>
          </div>
        </form>
        <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          Uses your configured SMS API + webhook to track link clicks. Unique tracking links per customer.
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent requests</h2>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
            Export CSV
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Sent at</th>
                <th className="py-2 pr-4">Tracking link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{item.phone}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{item.sentAt}</td>
                  <td className="py-3 pr-4 text-slate-700">{item.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
