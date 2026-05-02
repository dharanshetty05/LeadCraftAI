"use client"

export default function LeadCard({ lead, updateStatus, openLead }) {

    const copyMessage = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(lead.message)
        alert("Message copied")
    }

    const update = (e, status) => {
        e.stopPropagation()
        updateStatus(lead._id, status)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "NEW":
                return "bg-slate-100 text-slate-600 border border-slate-200"
            case "MESSAGED":
                return "bg-blue-50 text-blue-600 border border-blue-200"
            case "REPLIED":
                return "bg-emerald-50 text-emerald-600 border border-emerald-200"
            default:
                return "bg-slate-100 text-slate-600"
        }
    }

    const getScoreColor = (score) => {
        switch (score) {
            case "HIGH":
                return "bg-red-50 text-red-600 border border-red-200"
            case "MEDIUM":
                return "bg-amber-50 text-amber-600 border border-amber-200"
            case "LOW":
                return "bg-slate-50 text-slate-500 border border-slate-200"
            default:
                return "bg-slate-100 text-slate-500"
        }
    }

    const getLeadPriority = (lead) => {
        if (lead.opportunityScore === "HIGH" && !lead.websiteDetected) {
            return { label: "HOT", color: "bg-red-500 text-white" }
        }
        if (lead.opportunityScore === "MEDIUM" && !lead.websiteDetected) {
            return { label: "GOOD", color: "bg-orange-400 text-black" }
        }

        return { label: "LOW", color: "bg-gray-300 text-black" }
    }

    const priority = getLeadPriority(lead)

    return (
        <div
            onClick={() => openLead(lead)}
            className={`group relative bg-white border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                priority.label === "HOT"
                    ? "border-red-200 shadow-sm shadow-red-50"
                    : "border-slate-200 shadow-sm"
            }`}
        >
            {/* HOT lead accent bar */}
            {priority.label === "HOT" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 rounded-t-2xl" />
            )}

            {/* Header */}
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-slate-800 truncate leading-snug">
                        {lead.businessName}
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        @{lead.instagramUsername}
                    </p>
                </div>

                <span className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap ${getStatusColor(lead.status)}`}>
                    {lead.status}
                </span>

                <div className="flex gap-2 items-center">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-semibold whitespace-nowrap ${priority.color}`}>
                        {priority.label}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap ${getStatusColor(lead.status)}`}>
                        {lead.status}
                    </span>
                </div>
            </div>

            {/* Lead Intelligence */}
            <div className="flex gap-2 mt-4 flex-wrap">
                <span className={`px-2.5 py-1 text-xs rounded-lg font-medium ${getScoreColor(lead.opportunityScore)}`}>
                    {lead.opportunityScore} priority
                </span>

                <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-slate-50 text-slate-500 border border-slate-200">
                    {lead.followers} followers
                </span>

                <span className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
                    lead.websiteDetected
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-red-50 text-red-500 border border-red-200"
                }`}>
                    {lead.websiteDetected ? "✓ Website" : "✗ No Website"}
                </span>
            </div>

            {/* Summary Preview */}
            <p className="text-sm text-slate-500 mt-3.5 line-clamp-2 leading-relaxed">
                {lead.summary}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-100 mt-4 pt-4" />

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={copyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors duration-150"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Message
                </button>

                <button
                    disabled={lead.status === "MESSAGED"}
                    onClick={(e) => update(e, "MESSAGED")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-2 rounded-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Messaged
                </button>

                <button
                    disabled={lead.status === "REPLIED"}
                    onClick={(e) => update(e, "REPLIED")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 px-3 py-2 rounded-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Replied
                </button>
            </div>
        </div>
    )
}