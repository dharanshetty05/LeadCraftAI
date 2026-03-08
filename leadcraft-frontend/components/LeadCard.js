"use client"

export default function LeadCard({ lead, updateStatus }) {
    const copyMessage = () => {
        navigator.clipboard.writeText(lead.message)
        alert("Message copied")
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "NEW": return "bg-gray-300 text-black"
            case "MESSAGED": return "bg-blue-500 text-white"
            case "REPLIED": return "bg-green-600 text-white"
            default: return "bg-gray-200"
        }
    }

    return (
        <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
                {lead.businessName}
            </h2>

            <p className="text-sm text-gray-500">
                @{lead.instagramUsername}
            </p>

            <p className="mt-2">
                Followers: {lead.followers}
            </p>

            <p className="mt-3 font-medium">
                Summary
            </p>
            <p>{lead.summary}</p>

            <p className="mt-3 font-medium">
                Opportunity
            </p>
            <p>{lead.opportunity}</p>

            <p className="mt-3 font-medium">
                Outreach Message
            </p>

            <div className="bg-gray-100 p-3 rounded mt-1">
                {lead.message}
            </div>

            <button
                onClick={copyMessage}
                className="mt-3 bg-black text-white px-3 py-1 rounded"
            >
                Copy Message
            </button>

            <div className="mt-3 flex gap-2">
                <button
                    disabled={lead.status === "MESSAGED"}
                    onClick={() => updateStatus(lead._id, "MESSAGED")}
                    className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-40"
                >
                    Mark as Messaged
                </button>
                <button
                    disabled={lead.status === "REPLIED"}
                    onClick={() => updateStatus(lead._id, "REPLIED")}
                    className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-40"
                >
                    Mark as Replied
                </button>
            </div>

            <div className="mt-3">
                <span className={`px-3 py-1 rounded text-sm ${getStatusColor(lead.status)}`}>
                    {lead.status}
                </span>
            </div>
        </div>
        
    )
}