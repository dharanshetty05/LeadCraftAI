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
                return "bg-gray-200 text-gray-800"
            case "MESSAGED":
                return "bg-blue-500 text-white"
            case "REPLIED":
                return "bg-green-600 text-white"
            default:
                return "bg-gray-200"
        }
    }

    const getScoreColor = (score) => {
        switch (score) {
            case "HIGH":
                return "bg-red-500 text-white"
            case "MEDIUM":
                return "bg-yellow-400 text-black"
            case "LOW":
                return "bg-green-500 text-white"
            default:
                return "bg-gray-200"
        }
    }

    return (
        <div
            onClick={() => openLead(lead)}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
        >

            {/* Header */}
            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-lg font-semibold">
                        {lead.businessName}
                    </h2>

                    <p className="text-sm text-gray-500">
                        @{lead.instagramUsername}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 text-xs rounded ${getStatusColor(lead.status)}`}
                >
                    {lead.status}
                </span>

            </div>


            {/* Lead Intelligence */}
            <div className="flex gap-2 mt-3 flex-wrap">

                <span
                    className={`px-2 py-1 text-xs rounded ${getScoreColor(lead.opportunityScore)}`}
                >
                    {lead.opportunityScore}
                </span>

                <span className="px-2 py-1 text-xs rounded bg-gray-100">
                    Followers: {lead.followers}
                </span>

                <span
                    className={`px-2 py-1 text-xs rounded ${
                        lead.websiteDetected
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {lead.websiteDetected ? "Website Found" : "No Website"}
                </span>

            </div>


            {/* Summary Preview */}
            <p className="text-sm text-gray-700 mt-3 line-clamp-2">
                {lead.summary}
            </p>


            {/* Actions */}
            <div className="flex gap-2 mt-4 flex-wrap">

                <button
                    onClick={copyMessage}
                    className="text-sm bg-black text-white px-3 py-1 rounded"
                >
                    Copy Message
                </button>

                <button
                    disabled={lead.status === "MESSAGED"}
                    onClick={(e) => update(e, "MESSAGED")}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-40"
                >
                    Messaged
                </button>

                <button
                    disabled={lead.status === "REPLIED"}
                    onClick={(e) => update(e, "REPLIED")}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded disabled:opacity-40"
                >
                    Replied
                </button>

            </div>

        </div>
    )
}