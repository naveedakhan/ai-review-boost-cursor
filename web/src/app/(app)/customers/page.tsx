const customers = [
  { id: 1, name: "Sara J.", phone: "+92 300 1112233", email: "sara@example.com", last: "Nov 21" },
  { id: 2, name: "Ali K.", phone: "+92 321 9988776", email: "ali@example.com", last: "Nov 19" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Customers
          </p>
          <h1 className="text-3xl font-bold text-slate-950">Guest list</h1>
          <p className="text-sm text-slate-600">
            Upload CSV (name, phone, email optional) or add guests manually to send review requests.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
            Upload CSV
          </button>
          <button className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
            Add customer
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Last requested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {customer.name}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{customer.phone}</td>
                  <td className="py-3 pr-4 text-slate-700">{customer.email}</td>
                  <td className="py-3 pr-4 text-slate-700">{customer.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
