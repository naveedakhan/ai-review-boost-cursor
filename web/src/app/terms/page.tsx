export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-950">Terms of Service</h1>
      <p className="text-sm text-slate-700">
        HS Review Booster is offered for restaurants in Pakistan. Use is subject to our SMS limits
        (Free 50/month, Starter 200/month) and single-restaurant scope for the MVP. Manual upgrades
        are completed after offline payment confirmation.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>SMS only; WhatsApp is not supported in the MVP.</li>
        <li>Unique tracking links are used for click tracking; no conversion tracking to reviews yet.</li>
        <li>AI replies are generated once per review and stored; no auto-regeneration.</li>
        <li>We rely on Google Places as primary data source and Apify as fallback.</li>
        <li>Service may be paused if abuse or spam is detected.</li>
      </ul>
    </div>
  );
}
