"use client"

import { useState } from "react"
import LeadForm from "../components/LeadForm"

export default function Home() {
  const [formVisible, setFormVisible] = useState(false)

  const scrollToForm = () => {
    setFormVisible(true)
    setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
    }, 50)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-tight text-white">
          Lead<span className="text-indigo-400">Craft</span> AI
        </span>
        <button
          onClick={scrollToForm}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Get started →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-28 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Outreach
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6">
            Outreach that feels{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              handwritten.
            </span>
            <br />
            Generated in seconds.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Paste an Instagram bio and caption. LeadCraft AI crafts a personalized, ready-to-send outreach message — no templates, no fluff.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-800/60 hover:-translate-y-0.5"
          >
            Try it free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Used by 100+ creators
          </span>
          <span className="w-px h-4 bg-white/10 hidden sm:block" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            No account required
          </span>
          <span className="w-px h-4 bg-white/10 hidden sm:block" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Results in under 10 seconds
          </span>
        </div>
      </section>

      {/* ── EXAMPLE SECTION ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">See it in action</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">From bio to message — instantly.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            {/* Input card */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium uppercase tracking-widest">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="ml-1">Input</span>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1.5 font-medium">Instagram Bio</p>
                <div className="bg-white/[0.03] rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed border border-white/5">
                  🌿 Handmade skincare | Small batch, big love | DM for orders | Based in Austin, TX
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1.5 font-medium">Recent Caption</p>
                <div className="bg-white/[0.03] rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed border border-white/5">
                  Just dropped our new rose clay face mask 🌸 Limited batch — first 20 orders get a free lip balm. Link in bio!
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            </div>

            {/* Output card */}
            <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium uppercase tracking-widest">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generated Message
                </div>
                <span className="text-xs text-indigo-500/70 bg-indigo-500/10 px-2 py-0.5 rounded-full">Ready to send</span>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed space-y-3">
                <p>Hey! 👋 I came across your skincare page and love what you're building — the rose clay mask launch looked amazing.</p>
                <p>I help small product brands like yours get more DMs and sales through their Instagram without running ads. It's a simple system that's worked really well for handmade brands.</p>
                <p>Would you be open to a quick chat to see if it could work for you?</p>
              </div>
            </div>
          </div>

          {/* Divider label */}
          <div className="flex items-center gap-4 mt-6 md:hidden">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-slate-600">↓ Generated output</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Three steps. No learning curve.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Paste their profile",
                desc: "Drop in an Instagram bio and a recent caption from any business you want to reach.",
              },
              {
                step: "02",
                title: "AI reads the signal",
                desc: "LeadCraft analyzes their niche, tone, and offer to understand exactly who they are.",
              },
              {
                step: "03",
                title: "Send the message",
                desc: "Get a personalized outreach message that speaks to their specific situation — not a template.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white/[0.02] border border-white/6 rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="text-3xl font-bold text-white/8 mb-4 font-mono">{step}</div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full" />
            <h2 className="relative text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Stop sending cold messages.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Start sending the right ones.
              </span>
            </h2>
          </div>

          <p className="text-slate-400 mb-10 leading-relaxed">
            Your first message is free. No sign-up, no credit card, no catch.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-xl shadow-indigo-950/60 hover:shadow-indigo-900/60 hover:-translate-y-0.5"
          >
            Generate your first message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section
        id="lead-form"
        className={`px-6 pb-28 transition-all duration-500 ${
          formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden pb-0"
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Craft your outreach message</h2>
            <p className="text-slate-500 text-sm">Paste the profile details below — your message will be ready in seconds.</p>
          </div>
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} LeadCraft AI — Built for outbound sellers who care about quality.
        </p>
      </footer>

    </main>
  )
}