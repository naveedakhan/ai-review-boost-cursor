export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-950">Privacy Policy</h1>
      <p className="text-sm text-slate-700">
        HS Review Booster stores data securely on Supabase (EU-friendly Postgres). We use your
        information to deliver review management services for restaurants in Pakistan. We do not sell
        your data. Contact hello@halsahal.com for any privacy questions.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Authentication and sessions are handled by Supabase Auth.</li>
        <li>Review data is pulled from Google Places; Apify is only a fallback.</li>
        <li>SMS messages must include opt-out text (e.g., “Reply STOP to opt out”).</li>
        <li>We send lead notifications via Resend to our internal team.</li>
        <li>You can request deletion of your account and data at any time.</li>
      </ul>
    </div>
  );
}
