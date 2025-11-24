const fields = [
  { label: "Restaurant name", name: "name", placeholder: "BBQ Gali Lahore" },
  { label: "Google Maps URL", name: "maps_url", placeholder: "https://maps.app.goo.gl/..." },
  { label: "City", name: "city", placeholder: "Lahore" },
  { label: "Phone", name: "phone", placeholder: "+92 3XX XXX XXXX" },
];

export default function RestaurantPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Setup
        </p>
        <h1 className="text-3xl font-bold text-slate-950">Restaurant details</h1>
        <p className="text-sm text-slate-600">
          Paste your Google Maps link. We&apos;ll fetch and pre-fill the basics automatically.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <form className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-slate-800" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="categories">
              Categories
            </label>
            <input
              id="categories"
              name="categories"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Desi, BBQ, Café"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="notes">
              Internal notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="e.g., prefer Urdu replies, busy hours 7-10pm"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Save restaurant
            </button>
          </div>
        </form>
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          Google Places is the primary source. If it fails, Apify is used as a fallback.
        </div>
      </div>
    </div>
  );
}
