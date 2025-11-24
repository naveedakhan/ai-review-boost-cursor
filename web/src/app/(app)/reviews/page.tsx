import { Search, Star } from "lucide-react";

const sampleReviews = [
  {
    id: 1,
    name: "Noor S.",
    rating: 5,
    date: "Nov 15",
    text: "Best karahi in Gulberg. Staff was kind.",
  },
  {
    id: 2,
    name: "Talha H.",
    rating: 3,
    date: "Nov 12",
    text: "Food was good but order took 25 minutes.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Reviews
          </p>
          <h1 className="text-3xl font-bold text-slate-950">Google feedback</h1>
          <p className="text-sm text-slate-600">
            Filter by rating or date. AI suggestions are saved once and reused.
          </p>
        </div>
        <div className="flex gap-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700"
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
          <Search className="h-4 w-4 text-slate-600" />
          <input
            className="w-56 text-sm outline-none"
            placeholder="Search reviews"
          />
        </div>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
          Last 30 days
        </button>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
          Export CSV
        </button>
      </div>

      <div className="space-y-4">
        {sampleReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  {review.name}
                </p>
                <span className="text-xs text-slate-600">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                <Star className="h-3 w-3" />
                {review.rating}
              </div>
            </div>
            <p className="text-sm text-slate-700">{review.text}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">AI suggestion</p>
                <p>
                  Thank you for visiting! We appreciate the feedback and are improving wait times.
                </p>
              </div>
              <div className="rounded-xl bg-white p-3 text-sm text-slate-700 ring-1 ring-slate-100">
                <p className="font-semibold text-slate-900">Your reply</p>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="Edit and post your response"
                  rows={2}
                />
                <div className="mt-2 flex gap-2">
                  <button className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700">
                    Post reply
                  </button>
                  <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
                    Reuse suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
