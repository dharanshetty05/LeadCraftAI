"use client"

import { useState } from "react"

export default function LeadDetailModal({ lead, onClose, onMessageUpdate }) {

    const [message, setMessage] = useState(lead.message)
    const [saving, setSaving] = useState(false)

    const saveMessage = async () => {
        try {
            setSaving(true)
            const res = await fetch(
                `http://localhost:5000/api/leads/${lead._id}/message`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message })
                }
            )
            const updatedLead = await res.json()
            onMessageUpdate(updatedLead)
            setSaving(false)
        } catch (error) {
            console.error("Message update failed", error)
            setSaving(false)
        }
    }

    const getScoreColor = (score) => {
        switch(score) {
            case "HIGH": return "bg-red-50 text-red-600 border border-red-200"
            case "MEDIUM": return "bg-amber-50 text-amber-600 border border-amber-200"
            case "LOW": return "bg-slate-50 text-slate-500 border border-slate-200"
            default: return "bg-slate-100 text-slate-500"
        }
    }

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[88vh] overflow-hidden flex flex-col shadow-2xl">

                {/* Modal Header */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 leading-snug">
                            {lead.businessName}
                        </h2>
                        <p className="text-sm text-slate-400 mt-0.5">
                            @{lead.instagramUsername}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-150"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-slate-400 font-medium mb-1">Followers</p>
                            <p className="text-base font-semibold text-slate-700">{lead.followers}</p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-slate-400 font-medium mb-1.5">Opportunity</p>
                            <span className={`px-2.5 py-1 text-xs rounded-lg font-medium ${getScoreColor(lead.opportunityScore)}`}>
                                {lead.opportunityScore}
                            </span>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-slate-400 font-medium mb-1.5">Website</p>
                            <span className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
                                lead.websiteDetected
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                    : "bg-red-50 text-red-500 border border-red-200"
                            }`}>
                                {lead.websiteDetected ? "✓ Found" : "✗ None"}
                            </span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Summary</p>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                            {lead.summary}
                        </p>
                    </div>

                    {/* Opportunity */}
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Opportunity</p>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                            {lead.opportunity}
                        </p>
                    </div>

                    {/* Outreach Message */}
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Outreach Message</p>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-slate-200 bg-white text-sm text-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-200 resize-none leading-relaxed"
                            rows="5"
                        />
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="text-sm font-medium text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveMessage}
                        disabled={saving}
                        className="inline-flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Message
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    )
}