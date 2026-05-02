import LeadForm from "../components/LeadForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col">

      {/* Top nav accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-12 opacity-60" />

      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Outreach
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white">
          Lead<span className="text-indigo-400">Craft</span> AI
        </h1>

        <p className="text-slate-400 mt-4 text-lg leading-relaxed">
          Generate personalized outreach messages for businesses without websites
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Paste an Instagram bio and caption — get a ready-to-send message instantly
        </p>
      </div>

      <div className="flex justify-center flex-1">
        <div className="w-full max-w-2xl">
          <LeadForm />
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mt-12 opacity-40" />

    </main>
  )
}